import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const publicRoot = join(root, "public");
const pagesRoot = join(root, "src", "pages");
const catalogPage = join(publicRoot, "index.html");
const catalogData = join(publicRoot, "explainer-catalog.json");

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).flatMap((name) => {
    const fullPath = join(directory, name);
    return statSync(fullPath).isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function normalizeRoute(value) {
  const normalized = value.split(/[?#]/, 1)[0].split(sep).join("/").replace(/^\/+|\/+$/g, "");
  return normalized ? `/${normalized}` : "/";
}

const publicRoutes = new Map();
for (const file of walk(publicRoot)) {
  if (!file.endsWith(`${sep}index.html`) && !file.endsWith("/index.html")) continue;
  const directory = relative(publicRoot, file).split(sep).join("/").replace(/(^|\/)index\.html$/, "");
  publicRoutes.set(normalizeRoute(directory), relative(root, file));
}

const astroRoutes = new Map();
for (const file of walk(pagesRoot)) {
  if (!file.endsWith(".astro")) continue;
  let page = relative(pagesRoot, file).split(sep).join("/").replace(/\.astro$/, "");
  page = page.replace(/(^|\/)index$/, "");
  astroRoutes.set(normalizeRoute(page), relative(root, file));
}

const collisions = [...publicRoutes.keys()].filter((route) => astroRoutes.has(route));
if (collisions.length) {
  console.error("\nExplainer route ownership collision detected.\n");
  for (const route of collisions) console.error(`  ${route}\n    public owner: ${publicRoutes.get(route)}\n    Astro owner:  ${astroRoutes.get(route)}`);
  process.exit(1);
}

if (!existsSync(catalogPage) || !existsSync(catalogData)) {
  console.error("\nCatalog validation failed: public/index.html or public/explainer-catalog.json is missing.\n");
  process.exit(1);
}

let catalog;
try { catalog = JSON.parse(readFileSync(catalogData, "utf8")); }
catch (error) { console.error("\nCatalog JSON is invalid.\n", error); process.exit(1); }
if (!Array.isArray(catalog)) { console.error("\nCatalog JSON must be an array.\n"); process.exit(1); }

const catalogRoutes = catalog.map((entry) => normalizeRoute(entry.route ?? ""));
const duplicateCatalogRoutes = [...new Set(catalogRoutes.filter((route, index) => catalogRoutes.indexOf(route) !== index))];
const invalidEntries = catalog.filter((entry) => !entry.title || !entry.summary || !entry.route || !entry.published);
const catalogRouteSet = new Set(catalogRoutes);
const ownedRouteSet = new Set([...publicRoutes.keys(), ...astroRoutes.keys()]);
ownedRouteSet.delete("/");
const missingFromCatalog = [...ownedRouteSet].filter((route) => !catalogRouteSet.has(route)).sort();
const missingOwner = [...catalogRouteSet].filter((route) => !ownedRouteSet.has(route)).sort();

if (duplicateCatalogRoutes.length || invalidEntries.length || missingFromCatalog.length || missingOwner.length) {
  console.error("\nExplainer catalog validation failed.\n");
  if (duplicateCatalogRoutes.length) console.error("  Duplicate catalog routes:\n" + duplicateCatalogRoutes.map((route) => `    ${route}`).join("\n"));
  if (invalidEntries.length) console.error(`  Invalid catalog entries: ${invalidEntries.length}`);
  if (missingFromCatalog.length) console.error("  Owned routes missing from catalog data:\n" + missingFromCatalog.map((route) => `    ${route}`).join("\n"));
  if (missingOwner.length) console.error("  Catalog routes without an owner:\n" + missingOwner.map((route) => `    ${route}`).join("\n"));
  process.exit(1);
}

console.log(`Route and catalog checks passed: ${publicRoutes.size} public routes, ${astroRoutes.size} Astro routes, and ${catalogRoutes.length} catalog entries.`);
