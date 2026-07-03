import "dotenv/config";
import {
  REST,
  Routes,
  SlashCommandBuilder,
} from "discord.js";
import { PERSONA_NAMES } from "./personas.js";

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_APPLICATION_ID;
const guildId = process.env.DISCORD_GUILD_ID;

if (!token || !clientId || !guildId) {
  console.error("Set DISCORD_TOKEN, DISCORD_APPLICATION_ID, DISCORD_GUILD_ID in .env");
  process.exit(1);
}

const vectorCommand = new SlashCommandBuilder()
  .setName("vector")
  .setDescription("Deploy VECTOR / Ghost — full fusion")
  .addStringOption((o) =>
    o.setName("objective").setDescription("What to secure, fix, or analyze").setRequired(true)
  );

const shadowCommand = new SlashCommandBuilder()
  .setName("shadow")
  .setDescription("Deploy a perimeter persona")
  .addStringOption((o) =>
    o
      .setName("persona")
      .setDescription("Archetype")
      .setRequired(true)
      .addChoices(...PERSONA_NAMES.map((p) => ({ name: p, value: p })))
  )
  .addStringOption((o) =>
    o.setName("objective").setDescription("Your task").setRequired(true)
  );

const commands = [vectorCommand.toJSON(), shadowCommand.toJSON()];

const rest = new REST({ version: "10" }).setToken(token);

await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

console.log(`Registered ${commands.length} guild commands on ${guildId}`);
