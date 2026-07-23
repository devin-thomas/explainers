import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const publicRoot = join(root, "public");
const pagesRoot = join(root, "src", "pages");

function walk(directory) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory).flatMap((name) => {
    const fullPath = join(directory, name);
    return statSync(fullPath).isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function normalizeRoute(value) {
  const normalized = value.split(sep).join("/").replace(/^\/+|\/+$/g, "");
  return normalized ? `/${normalized}` : "/";
}

const publicRoutes = new Map();
for (const file of walk(publicRoot)) {
  if (!file.endsWith(`${sep}index.html`) && !file.endsWith("/index.html")) continue;
  const directory = relative(publicRoot, file).replace(/(^|[\\/])index\.html$/, "");
  publicRoutes.set(normalizeRoute(directory), relative(root, file));
}

const astroRoutes = new Map();
for (const file of walk(pagesRoot)) {
  if (!file.endsWith(".astro")) continue;

  let page = relative(pagesRoot, file).replace(/\.astro$/, "");
  page = page.replace(/(^|[\\/])index$/, "");
  astroRoutes.set(normalizeRoute(page), relative(root, file));
}

const collisions = [...publicRoutes.keys()].filter((route) => astroRoutes.has(route));

if (collisions.length > 0) {
  console.error("\nExplainer route ownership collision detected.\n");
  for (const route of collisions) {
    console.error(`  ${route}`);
    console.error(`    public owner: ${publicRoutes.get(route)}`);
    console.error(`    Astro owner:  ${astroRoutes.get(route)}`);
  }
  console.error("\nEach route must be owned by exactly one source: public/ or src/pages/.\n");
  process.exit(1);
}

console.log(`Route ownership check passed: ${publicRoutes.size} public routes and ${astroRoutes.size} Astro routes.`);
