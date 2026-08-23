#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = join(root, "site");

const required = [
  "index.html",
  "404.html",
  "CNAME",
  "demo/index.html",
  "assets/css/base.css",
  "assets/css/theme-dhl.css",
  "assets/css/landing.css",
  "assets/css/demo.css",
  "assets/js/roster.js",
  "assets/js/incidents.js",
  "assets/js/perimeter.js",
  "assets/favicon.svg",
];

const missing = required.filter((path) => !existsSync(join(site, path)));
if (missing.length) {
  console.error("Missing site files:\n" + missing.map((p) => `  ${p}`).join("\n"));
  process.exit(1);
}

const window = {};
const context = createContext({ window });
for (const file of ["assets/js/roster.js", "assets/js/incidents.js"]) {
  runInContext(readFileSync(join(site, file), "utf8"), context, { filename: file });
}

const roster = window.SHADOW_ROSTER;
const incidents = window.SHADOW_INCIDENTS;
const packs = window.SHADOW_PACKS;

if (!Array.isArray(roster) || roster.length !== 20) {
  console.error(`Expected 20 personas, got ${roster?.length}`);
  process.exit(1);
}

const ids = new Set(roster.map((p) => p.id));
if (ids.size !== 20) {
  console.error("Persona ids are not unique");
  process.exit(1);
}

for (const incident of incidents) {
  if (!ids.has(incident.suggested)) {
    console.error(`Incident ${incident.id} suggests unknown persona ${incident.suggested}`);
    process.exit(1);
  }
  if (incident.trace.length !== 3) {
    console.error(`Incident ${incident.id} needs a 3-step logic trace`);
    process.exit(1);
  }
}

const packIds = new Set(roster.map((p) => p.pack));
for (const pack of packs.filter((p) => p.id !== "all")) {
  if (!packIds.has(pack.id)) {
    console.error(`Pack chip ${pack.id} has no personas`);
    process.exit(1);
  }
}

const cname = readFileSync(join(site, "CNAME"), "utf8").trim();
if (cname !== "vector.darkheartlabs.technology") {
  console.error(`Unexpected CNAME: ${cname}`);
  process.exit(1);
}

console.log(`Demo check passed: ${roster.length} personas, ${incidents.length} incidents.`);
