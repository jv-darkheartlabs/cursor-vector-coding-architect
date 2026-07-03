import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  Partials,
} from "discord.js";
import OpenAI from "openai";
import { loadPersonaPrompt } from "./personas.js";

const token = process.env.DISCORD_TOKEN;
const allowedChannels = (process.env.ALLOWED_CHANNEL_IDS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (!token || !process.env.OPENAI_API_KEY) {
  console.error("Set DISCORD_TOKEN and OPENAI_API_KEY in .env");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
  partials: [Partials.Channel],
});

function channelAllowed(channelId) {
  if (allowedChannels.length === 0) return true;
  return allowedChannels.includes(channelId);
}

async function runVector(persona, objective, userName) {
  const system = loadPersonaPrompt(persona === "vector" ? "ghost" : persona);
  if (!system) throw new Error(`Unknown persona: ${persona}`);

  const res = await openai.chat.completions.create({
    model,
    messages: [
      { role: "system", content: system },
      {
        role: "user",
        content: `User: ${userName}\nObjective: ${objective}\n\nRespond in Discord with VECTOR four-part template. Code-only dominance metaphors. No copyrighted character names.`,
      },
    ],
    max_tokens: 1800,
  });

  return res.choices[0]?.message?.content ?? "[STATUS: SILENT] // No response generated.";
}

function splitMessage(text, max = 1900) {
  if (text.length <= max) return [text];
  const chunks = [];
  let rest = text;
  while (rest.length > max) {
    let cut = rest.lastIndexOf("\n", max);
    if (cut < max * 0.5) cut = max;
    chunks.push(rest.slice(0, cut));
    rest = rest.slice(cut).trimStart();
  }
  if (rest) chunks.push(rest);
  return chunks;
}

client.once("ready", () => {
  console.log(`VECTOR bot online as ${client.user.tag}`);
  console.log(
    allowedChannels.length
      ? `Channels: ${allowedChannels.join(", ")}`
      : "Channels: all (set ALLOWED_CHANNEL_IDS to restrict)"
  );
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!channelAllowed(interaction.channelId)) {
    await interaction.reply({
      content: "This command only works in `#logic-trace` and `#gem-support`.",
      ephemeral: true,
    });
    return;
  }

  const objective =
    interaction.options.getString("objective", true) ||
    interaction.options.getString("objective");

  let persona = "ghost";
  if (interaction.commandName === "shadow") {
    persona = interaction.options.getString("persona", true);
  }

  await interaction.deferReply();

  try {
    const reply = await runVector(
      persona,
      objective,
      interaction.user.username
    );
    const parts = splitMessage(reply);
    await interaction.editReply(parts[0]);
    for (let i = 1; i < parts.length; i++) {
      await interaction.followUp(parts[i]);
    }
  } catch (err) {
    console.error(err);
    await interaction.editReply(
      `[STATUS: BREACH] // ${err.message}\n\nThe perimeter failed. Try again or use Cursor locally with /vector.`
    );
  }
});

client.login(token);
