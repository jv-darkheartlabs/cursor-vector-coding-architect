window.SHADOW_INCIDENTS = [
  {
    id: "p0-checkout",
    kicker: "P0 · production",
    title: "Checkout 500s after deploy",
    symptom: "Customers cannot pay. Error rate spiked at 18:42 UTC. Last deploy: payments-api@2.14.3.",
    suggested: "commander",
    threat: "critical",
    perimeter: "PAYMENTS API",
    trace: ["Incoming checkout POST", "Unhandled Stripe timeout", "Naked 500 to the storefront"],
    code: `app.use((err, req, res, _next) => {
  req.log.error({ err, reqId: req.id }, "checkout.fail");
  if (err.code === "STRIPE_TIMEOUT" || err.type === "StripeConnectionError") {
    return res.status(503).json({
      error: "checkout_unavailable",
      retry: true,
    });
  }
  res.status(500).json({ error: "internal", reqId: req.id });
});`
  },
  {
    id: "auth-leak",
    kicker: "CRITICAL BREACH",
    title: "JWT printed in application logs",
    symptom: "Support paste includes Authorization headers. Log drain ships to a shared Grafana org.",
    suggested: "decryptor",
    threat: "critical",
    perimeter: "AUTH GATE",
    trace: ["Bearer token in request", "pino serializer missing", "Secret written to the drain"],
    code: `const redact = ["req.headers.authorization", "req.headers.cookie", "password", "token"];

const logger = pino({
  redact: { paths: redact, censor: "[REDACTED]" },
  serializers: {
    req(req) {
      return { method: req.method, url: req.url, id: req.id };
    },
  },
});`
  },
  {
    id: "premerge-webhook",
    kicker: "pre-merge",
    title: "PR adds a payment webhook",
    symptom: "No signature verify. Retry storm possible. Observability stops at console.log.",
    suggested: "watcher",
    threat: "elevated",
    perimeter: "WEBHOOK INGRESS",
    trace: ["Unsigned Stripe event", "Missing idempotency key", "Blind retry into fulfillment"],
    code: `export async function stripeWebhook(req, res) {
  const signature = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return res.status(400).send("invalid signature");
  }
  const seen = await redis.set(\`stripe:\${event.id}\`, "1", "EX", 86400, "NX");
  if (!seen) return res.status(200).send("duplicate");
  await fulfill(event);
  return res.status(200).send("ok");
}`
  },
  {
    id: "tf-drift",
    kicker: "infra",
    title: "Kubernetes replicas drifting",
    symptom: "terraform plan wants to drop 6 replicas. HPA already scaled them. Nobody owns the invariant.",
    suggested: "architect",
    threat: "elevated",
    perimeter: "CLUSTER INVARIANT",
    trace: ["Terraform replica count", "HPA live scale", "Plan that would crush peak traffic"],
    code: `resource "kubernetes_horizontal_pod_autoscaler_v2" "api" {
  metadata { name = "payments-api" }
  spec {
    scale_target_ref {
      kind = "Deployment"
      name = "payments-api"
    }
    min_replicas = 3
    max_replicas = 12
  }
}

# Deployment replica count is informational.
# HPA owns runtime scale. Do not terraform it back to 2.`
  },
  {
    id: "nplus1",
    kicker: "mentor",
    title: "Dashboard takes 8 seconds",
    symptom: "Junior loop: for each order, fetch the customer. Works in dev with 12 rows. Staging has 14k.",
    suggested: "patron",
    threat: "neutral",
    perimeter: "READ PATH",
    trace: ["List orders", "N extra customer queries", "Thread pool starvation"],
    code: `const orders = await db.select().from(ordersTable).where(eq(ordersTable.accountId, id));
const customerIds = [...new Set(orders.map((row) => row.customerId))];
const customers = await db.select().from(customersTable).where(inArray(customersTable.id, customerIds));
const byId = new Map(customers.map((row) => [row.id, row]));
return orders.map((order) => ({ ...order, customer: byId.get(order.customerId) }));`
  },
  {
    id: "poison-queue",
    kicker: "workers",
    title: "Retry loop will not die",
    symptom: "fulfillment.worker retries a malformed payload 40k times. DLQ exists. Nothing writes to it.",
    suggested: "syndicate",
    threat: "elevated",
    perimeter: "WORKER NETWORK",
    trace: ["Malformed job body", "Retry without cap", "Queue depth eating the family"],
    code: `async function handle(job) {
  try {
    await fulfill(JSON.parse(job.body));
  } catch (err) {
    if (job.attemptsMade >= 5 || err instanceof SyntaxError) {
      await deadLetter.send({ body: job.body, reason: String(err) });
      return;
    }
    throw err;
  }
}`
  }
];
