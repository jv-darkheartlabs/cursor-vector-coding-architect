(function () {
  const roster = window.SHADOW_ROSTER;
  const incidents = window.SHADOW_INCIDENTS;
  const packs = window.SHADOW_PACKS;

  const state = {
    incidentId: incidents[0].id,
    personaId: incidents[0].suggested,
    pack: "all",
    deployed: false,
  };

  const els = {
    incidents: document.querySelector("[data-incidents]"),
    roster: document.querySelector("[data-roster]"),
    packs: document.querySelector("[data-packs]"),
    status: document.querySelector("[data-hud-status]"),
    clock: document.querySelector("[data-clock]"),
    consoleTitle: document.querySelector("[data-console-title]"),
    transmission: document.querySelector("[data-transmission]"),
    deploy: document.querySelector("[data-deploy]"),
    copy: document.querySelector("[data-copy]"),
    reset: document.querySelector("[data-reset]"),
  };

  function personaById(id) {
    return roster.find((p) => p.id === id) ?? roster[0];
  }

  function incidentById(id) {
    return incidents.find((i) => i.id === id) ?? incidents[0];
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function threatLabel(threat) {
    switch (threat) {
      case "critical":
        return "CRITICAL";
      case "elevated":
        return "ELEVATED";
      case "neutral":
        return "NEUTRAL";
      default: {
        const _exhaustive = threat;
        return String(_exhaustive);
      }
    }
  }

  function renderHud() {
    const incident = incidentById(state.incidentId);
    const persona = personaById(state.personaId);
    const threat = state.deployed ? incident.threat : "standby";
    const line = state.deployed
      ? `[STATUS: ${persona.name.toUpperCase()} DEPLOYED] // [PERIMETER: ${incident.perimeter}] // [THREAT: ${threatLabel(incident.threat)}]`
      : `[STATUS: STANDBY] // [PERIMETER: SHADOW GEM] // [THREAT: STANDBY]`;
    els.status.textContent = line;
    els.status.dataset.threat = threat === "standby" ? "standby" : incident.threat;
  }

  function renderIncidents() {
    els.incidents.innerHTML = "";
    for (const incident of incidents) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "incident-card" + (incident.id === state.incidentId ? " is-active" : "");
      btn.setAttribute("aria-pressed", String(incident.id === state.incidentId));
      btn.innerHTML = `<div class="kicker">${incident.kicker}</div><h3>${incident.title}</h3><p>${incident.symptom}</p>`;
      btn.addEventListener("click", () => {
        state.incidentId = incident.id;
        state.personaId = incident.suggested;
        state.deployed = false;
        render();
      });
      els.incidents.appendChild(btn);
    }
  }

  function renderPacks() {
    els.packs.innerHTML = "";
    for (const pack of packs) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip" + (pack.id === state.pack ? " is-active" : "");
      chip.textContent = pack.label;
      chip.addEventListener("click", () => {
        state.pack = pack.id;
        renderRoster();
        renderPacks();
      });
      els.packs.appendChild(chip);
    }
  }

  function renderRoster() {
    const suggested = incidentById(state.incidentId).suggested;
    const visible = roster.filter((p) => state.pack === "all" || p.pack === state.pack);
    els.roster.innerHTML = "";
    for (const persona of visible) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "persona-card";
      if (persona.id === state.personaId) btn.classList.add("is-active");
      if (persona.id === suggested) btn.classList.add("is-suggested");
      btn.setAttribute("aria-pressed", String(persona.id === state.personaId));
      const cap = persona.cap === "∞" ? "uncapped" : `cap ${persona.cap}`;
      const trig = persona.id === suggested ? ` <span class="trig">· trigger</span>` : "";
      btn.innerHTML = `<span class="name"><span class="intensity-dot" data-level="${persona.intensity}"></span>${persona.name}</span><span class="meta">${persona.command} · ${persona.intensity} · ${cap}${trig}</span>`;
      btn.title = persona.role;
      btn.addEventListener("click", () => {
        state.personaId = persona.id;
        state.deployed = false;
        render();
      });
      els.roster.appendChild(btn);
    }
  }

  function buildTransmission() {
    const incident = incidentById(state.incidentId);
    const persona = personaById(state.personaId);
    const suggested = personaById(incident.suggested);
    const override =
      persona.id !== incident.suggested
        ? ` Stack trigger wanted ${suggested.name}. You overrode to ${persona.name}. I still own the fix.`
        : "";
    const closing = persona.closings[incident.title.length % persona.closings.length];
    return {
      status: `[STATUS: ${persona.name.toUpperCase()} DEPLOYED] // [PERIMETER: ${incident.perimeter}] // [THREAT: ${threatLabel(incident.threat)}]`,
      trace: `Logic Trace: [${incident.trace[0]}] -> [${incident.trace[1]}] -> [${incident.trace[2]}].`,
      lead: persona.lead + override,
      code: incident.code,
      closing,
      threat: incident.threat,
      title: `${persona.name} on ${incident.title}`,
    };
  }

  function placeholderHtml() {
    const incident = incidentById(state.incidentId);
    const persona = personaById(state.personaId);
    const suggested = personaById(incident.suggested);
    return `<p class="placeholder">Incident armed. <strong>${persona.name}</strong> is on deck${
      persona.id === suggested.id ? " — stack trigger agrees." : ` — trigger wanted ${suggested.name}.`
    } Deploy VECTOR to pull the four-part transmission.</p>`;
  }

  function transmissionHtml(tx, withCursor) {
    const cursor = withCursor ? " cursor-blink" : "";
    return `
      <p class="status-line${cursor}">${tx.status}</p>
      <div class="block">
        <p class="block-label">02 · logic trace</p>
        <p>${tx.trace}</p>
      </div>
      <div class="block">
        <p class="block-label">03 · systemic execution</p>
        <p class="lead">${tx.lead}</p>
        <pre><code>${escapeHtml(tx.code)}</code></pre>
      </div>
      <div class="block">
        <p class="block-label">04 · closing word</p>
        <p class="closing">${tx.closing}</p>
      </div>
    `;
  }

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function typeTransmission(tx) {
    els.transmission.dataset.threat = tx.threat;
    const html = transmissionHtml(tx, true);
    if (prefersReducedMotion()) {
      els.transmission.innerHTML = transmissionHtml(tx, false);
      return;
    }
    els.transmission.innerHTML = "";
    const shell = document.createElement("div");
    shell.innerHTML = html;
    const nodes = [...shell.childNodes];
    let i = 0;
    function step() {
      if (i >= nodes.length) {
        const blink = els.transmission.querySelector(".cursor-blink");
        if (blink) blink.classList.remove("cursor-blink");
        return;
      }
      els.transmission.appendChild(nodes[i]);
      i += 1;
      window.setTimeout(step, 90);
    }
    step();
  }

  function renderConsole() {
    const incident = incidentById(state.incidentId);
    const persona = personaById(state.personaId);
    els.consoleTitle.textContent = state.deployed
      ? `${persona.name} · ${incident.title}`
      : "Transmission idle";
    if (!state.deployed) {
      els.transmission.dataset.threat = "standby";
      els.transmission.innerHTML = placeholderHtml();
    }
    els.copy.disabled = !state.deployed;
  }

  function deploy() {
    state.deployed = true;
    const tx = buildTransmission();
    renderHud();
    renderConsole();
    typeTransmission(tx);
    els.copy.disabled = false;
  }

  function copyTransmission() {
    const tx = buildTransmission();
    const text = [
      tx.status,
      "",
      tx.trace,
      "",
      tx.lead,
      "",
      tx.code,
      "",
      tx.closing,
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      els.copy.textContent = "Copied";
      window.setTimeout(() => {
        els.copy.textContent = "Copy trace";
      }, 1200);
    });
  }

  function tickClock() {
    const now = new Date();
    els.clock.textContent = now.toISOString().replace(".000Z", "Z");
  }

  function render() {
    renderHud();
    renderIncidents();
    renderPacks();
    renderRoster();
    renderConsole();
  }

  els.deploy.addEventListener("click", deploy);
  els.copy.addEventListener("click", copyTransmission);
  els.reset.addEventListener("click", () => {
    state.deployed = false;
    render();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.metaKey && !event.ctrlKey) {
      const tag = event.target.tagName;
      if (tag !== "BUTTON" && tag !== "A") deploy();
    }
  });

  tickClock();
  window.setInterval(tickClock, 1000);
  render();
})();
