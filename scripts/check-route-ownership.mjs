import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const publicRoot = join(root, "public");
const pagesRoot = join(root, "src", "pages");
const catalogFile = join(publicRoot, "index.html");

function walk(directory) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory).flatMap((name) => {
    const fullPath = join(directory, name);
    return statSync(fullPath).isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function normalizeRoute(value) {
  const normalized = value
    .split(/[?#]/, 1)[0]
    .split(sep)
    .join("/")
    .replace(/^\/+|\/+$/g, "");
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

if (!existsSync(catalogFile)) {
  console.error("\nCatalog validation failed: public/index.html is missing.\n");
  process.exit(1);
}

const catalogHtml = readFileSync(catalogFile, "utf8");
const catalogRoutes = [];
const anchorPattern = /<a\b([^>]*)>/gi;
let anchorMatch;

while ((anchorMatch = anchorPattern.exec(catalogHtml)) !== null) {
  const attributes = anchorMatch[1];
  const className = attributes.match(/\bclass=["']([^"']*)["']/i)?.[1] ?? "";
  if (!className.split(/\s+/).includes("open")) continue;

  const href = attributes.match(/\bhref=["']([^"']+)["']/i)?.[1];
  if (!href || !href.startsWith("/")) continue;
  catalogRoutes.push(normalizeRoute(href));
}

const duplicateCatalogRoutes = [...new Set(catalogRoutes.filter((route, index) => catalogRoutes.indexOf(route) !== index))];
const catalogRouteSet = new Set(catalogRoutes);
const ownedRouteSet = new Set([...publicRoutes.keys(), ...astroRoutes.keys()]);
ownedRouteSet.delete("/");

const missingFromCatalog = [...ownedRouteSet].filter((route) => !catalogRouteSet.has(route)).sort();
const missingOwner = [...catalogRouteSet].filter((route) => !ownedRouteSet.has(route)).sort();

if (duplicateCatalogRoutes.length || missingFromCatalog.length || missingOwner.length) {
  console.error("\nExplainer catalog validation failed.\n");

  if (duplicateCatalogRoutes.length) {
    console.error("  Duplicate catalog routes:");
    for (const route of duplicateCatalogRoutes) console.error(`    ${route}`);
  }

  if (missingFromCatalog.length) {
    console.error("  Owned routes missing from public/index.html:");
    for (const route of missingFromCatalog) console.error(`    ${route}`);
  }

  if (missingOwner.length) {
    console.error("  Catalog routes without a public/ or src/pages/ owner:");
    for (const route of missingOwner) console.error(`    ${route}`);
  }

  console.error("\nEvery explainer route must have exactly one owner and exactly one catalog card.\n");
  process.exit(1);
}

console.log(
  `Route and catalog checks passed: ${publicRoutes.size} public routes, ${astroRoutes.size} Astro routes, and ${catalogRoutes.length} catalog entries.`,
);
