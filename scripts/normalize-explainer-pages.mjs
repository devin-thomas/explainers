import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const distRoot = join(process.cwd(), "dist");

const pages = [
  {
    route: "figma-basics",
    title: "Figma Basics",
    hook: "A practical introduction to frames, auto layout, components, variables, prototypes, and developer handoff.",
  },
  {
    route: "publish-a-website",
    title: "The Smallest Ways to Publish a Website",
    hook: "From one file to a real website.",
    preserveTopNavigation: true,
  },
  {
    route: "ai-gamedev-compatibility",
    title: "AI Game-Development Compatibility",
    hook: "A platform-by-platform index for AI-assisted retro game development.",
  },
  {
    route: "ai-gamedev-compatibility-gemini",
    title: "AI Game-Development Compatibility — Gemini",
    hook: "Gemini's comparison of retro platforms for AI-assisted game development.",
  },
];

const contractStyles = `
<style id="explainer-page-contract-styles">
  .explainer-page-nav,
  .explainer-page-identity {
    width: min(1160px, calc(100% - 30px));
    margin-inline: auto;
    font-family: Inter, Roboto, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  .explainer-page-nav {
    position: relative;
    display: flex;
    align-items: center;
    padding-top: 18px;
  }
  .explainer-page-home {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    min-height: 42px;
    padding: 8px 12px;
    border: 1px solid rgba(255,255,255,.18);
    border-radius: 14px;
    background: rgba(24,22,31,.78);
    color: rgba(255,255,255,.94);
    text-decoration: none;
    font-size: .86rem;
    font-weight: 800;
  }
  .explainer-page-home img { width: 25px; height: 25px; border-radius: 7px; }
  .explainer-page-home:hover { border-color: rgba(196,181,253,.68); background: rgba(36,32,46,.9); }
  .explainer-page-home:focus-visible { outline: 3px solid rgba(196,181,253,.72); outline-offset: 3px; }
  .explainer-page-identity { padding: clamp(42px,7vw,82px) 4px clamp(22px,4vw,42px); color: rgba(255,255,255,.94); }
  .explainer-page-identity h1 { max-width: 1040px; margin: 0; font-size: clamp(3rem,8vw,6.8rem); line-height: .96; letter-spacing: -.055em; }
  .explainer-page-hook { max-width: 820px; margin: 20px 0 0; color: rgba(255,255,255,.66); font-size: clamp(1.05rem,2vw,1.3rem); line-height: 1.65; }
  .explainer-page-identity ~ * h1:first-of-type { display: none !important; }
  @media (max-width:560px) {
    .explainer-page-nav,
    .explainer-page-identity { width: calc(100% - 20px); }
  }
</style>`;

const navigation = `<nav class="explainer-page-nav" aria-label="Explainer navigation"><a class="explainer-page-home" href="/" aria-label="Return to the Uppercut Labs Explainers home page"><img src="/icons/favicon-32x32.png" width="25" height="25" alt="" aria-hidden="true"><span>Explainers</span></a></nav>`;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function textOnly(value) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function setDocumentTitle(html, title) {
  const documentTitle = `${title} — Explainers`;
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(documentTitle)}</title>`);
  } else {
    html = html.replace(/<\/head>/i, `<title>${escapeHtml(documentTitle)}</title></head>`);
  }

  if (/<meta\b[^>]*property=["']og:title["'][^>]*>/i.test(html)) {
    html = html.replace(
      /<meta\b[^>]*property=["']og:title["'][^>]*>/i,
      `<meta property="og:title" content="${escapeHtml(title)}">`,
    );
  } else {
    html = html.replace(/<\/head>/i, `<meta property="og:title" content="${escapeHtml(title)}"></head>`);
  }

  return html;
}

function removeFloatingHomeLinks(html) {
  return html.replace(
    /<a\b[^>]*class=(["'])[^"']*\buppercut-home-link\b[^"']*\1[^>]*>[\s\S]*?<\/a>/gi,
    "",
  );
}

for (const page of pages) {
  const file = join(distRoot, page.route, "index.html");
  if (!existsSync(file)) {
    throw new Error(`Expected built explainer route is missing: ${page.route}`);
  }

  let html = readFileSync(file, "utf8");
  html = setDocumentTitle(html, page.title);
  html = removeFloatingHomeLinks(html);

  if (!html.includes('id="explainer-page-contract-styles"')) {
    html = html.replace(/<\/head>/i, `${contractStyles}</head>`);
  }

  if (page.preserveTopNavigation && /<nav\b[^>]*class=(["'])[^"']*\btop\b[^"']*\1/i.test(html)) {
    html = html.replace(
      ".top{position:sticky;top:10px;z-index:10;",
      ".top{position:relative;",
    );
  } else if (!html.includes('class="explainer-page-nav"')) {
    html = html.replace(/<body([^>]*)>/i, `<body$1>${navigation}`);
  }

  const firstHeading = html.match(/<h1\b([^>]*)>([\s\S]*?)<\/h1>/i);
  if (firstHeading) {
    const previousHeading = textOnly(firstHeading[2]);
    const hook = previousHeading && previousHeading !== page.title ? previousHeading : page.hook;
    const replacement = `<h1${firstHeading[1]}>${escapeHtml(page.title)}</h1>${hook ? `<p class="explainer-page-hook">${escapeHtml(hook)}</p>` : ""}`;
    html = html.replace(firstHeading[0], replacement);
  } else {
    const identity = `<header class="explainer-page-identity"><h1>${escapeHtml(page.title)}</h1><p class="explainer-page-hook">${escapeHtml(page.hook)}</p></header>`;
    if (html.includes(navigation)) {
      html = html.replace(navigation, `${navigation}${identity}`);
    } else {
      html = html.replace(/<body([^>]*)>/i, `<body$1>${identity}`);
    }
  }

  writeFileSync(file, html);
  console.log(`Normalized /${page.route}`);
}
