import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const source = join(__dirname, "..", "node_modules", "tarteaucitronjs");
const dest = join(__dirname, "..", "public", "tarteaucitron");

if (!existsSync(source)) {
  console.warn("tarteaucitronjs not found in node_modules, skipping asset copy.");
  process.exit(0);
}

mkdirSync(dest, { recursive: true });

const files = [
  "tarteaucitron.min.js",
  "tarteaucitron.services.min.js",
  "css/tarteaucitron.min.css",
  "lang/tarteaucitron.fr.min.js",
  "lang/tarteaucitron.en.min.js",
];

for (const file of files) {
  const from = join(source, file);
  const to = join(dest, file);
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to);
}

// Recolor the default tarteaucitron theme (brand yellow / pure black) to
// match the site palette (app/globals.css: --color-primary, --color-anthracite).
const cssPath = join(dest, "css/tarteaucitron.min.css");
const css = readFileSync(cssPath, "utf8")
  .replaceAll("#fbd600", "#cbb68b")
  .replaceAll("#000000", "#404040")
  .replaceAll("#000}", "#404040}")
  .replaceAll("#000;", "#404040;");
writeFileSync(cssPath, css);

console.log(`Copied tarteaucitron assets to ${dest}`);
