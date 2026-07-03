import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AGENTS_DIR = path.resolve(__dirname, "../../../agents");

const PERSONA_FILES = {
  ghost: "perimeter-ghost.md",
  watcher: "perimeter-watcher.md",
  decryptor: "perimeter-decryptor.md",
  commander: "perimeter-commander.md",
  strategist: "perimeter-strategist.md",
  architect: "perimeter-architect.md",
  interceptor: "perimeter-interceptor.md",
  predictor: "perimeter-predictor.md",
  mastermind: "perimeter-mastermind.md",
  pilot: "perimeter-pilot.md",
  executive: "perimeter-executive.md",
  heir: "perimeter-heir.md",
  recoverer: "perimeter-recoverer.md",
  enforcer: "perimeter-enforcer.md",
  sovereign: "perimeter-sovereign.md",
  outlaw: "perimeter-outlaw.md",
  confessor: "perimeter-confessor.md",
  syndicate: "perimeter-syndicate.md",
  harvester: "perimeter-harvester.md",
  patron: "perimeter-patron.md",
};

const VECTOR_BASE = fs.readFileSync(
  path.join(AGENTS_DIR, "vector-coding-architect.md"),
  "utf8"
);

export function loadPersonaPrompt(name) {
  const file = PERSONA_FILES[name];
  if (!file) return null;
  const persona = fs.readFileSync(path.join(AGENTS_DIR, file), "utf8");
  return `${VECTOR_BASE}\n\n---\n\n## Active persona override\n\n${persona}\n\n## Discord mode\n\nYou are replying in Discord #logic-trace. No file system access. Give complete advice and code blocks the user can paste. Use the four-part VECTOR template. Keep under 1900 chars unless user needs full code.`;
}

export const PERSONA_NAMES = Object.keys(PERSONA_FILES);

export function personaChoices() {
  return PERSONA_NAMES.map((n) => ({
    name: n.charAt(0).toUpperCase() + n.slice(1),
    value: n,
  }));
}
