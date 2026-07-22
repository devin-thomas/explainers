import React, { useMemo, useState } from "react";

type LayerKey = "github" | "astro" | "vite" | "react" | "workers";
type DemoMode = "static" | "island";

const layers: Array<{
  key: LayerKey;
  name: string;
  role: string;
  analogy: string;
  description: string;
  icon: string;
}> = [
  {
    key: "github",
    name: "GitHub",
    role: "Source control + deployment trigger",
    analogy: "The library and change log",
    description:
      "GitHub stores the source. A push to the production branch can trigger Cloudflare Workers Builds automatically.",
    icon: "commit",
  },
  {
    key: "astro",
    name: "Astro",
    role: "Website framework + file-based routes",
    analogy: "The architect",
    description:
      "Astro organizes pages, layouts, content, and routes. It renders mostly HTML by default and lets you opt selected components into browser-side JavaScript.",
    icon: "orbit",
  },
  {
    key: "vite",
    name: "Vite",
    role: "Development server + build tool",
    analogy: "The workshop",
    description:
      "Astro uses Vite underneath. Vite transforms modules during development and creates optimized production assets during the build.",
    icon: "bolt",
  },
  {
    key: "react",
    name: "React",
    role: "Optional interactive UI library",
    analogy: "A specialist toolkit",
    description:
      "React can power filters, calculators, accordions, dashboards, and other interactive islands without owning the entire website.",
    icon: "widgets",
  },
  {
    key: "workers",
    name: "Cloudflare Workers",
    role: "Hosting + edge runtime",
    analogy: "The worldwide delivery network",
    description:
      "Workers serves Astro’s output globally and can later add APIs, bindings, scheduled jobs, or server rendering.",
    icon: "cloud",
  },
];

const alternatives = [
  ["Next.js / React Router", "App-first React frameworks; strong when React owns nearly the entire experience."],
  ["Plain Vite + React", "A direct SPA setup with fewer framework opinions, but you design routing and rendering strategy."],
  ["Eleventy / Hugo", "Static-site generators with simpler authoring models and fewer built-in island conventions."],
  ["Gatsby", "A React-oriented content framework historically centered on a heavier client application and data layer."],
];

const limitations = [
  "Astro adds its own .astro files, directives, content model, and adapter concepts to learn.",
  "Interactive components require an explicit client:* directive; without one, they render as static HTML.",
  "A highly interactive SPA may be simpler in an app-first React framework.",
  "On-demand rendering depends on the deployment adapter and runtime compatibility.",
  "Mixing several UI frameworks is possible, but can increase dependencies and maintenance.",
];

function Icon({ children }: { children: string }) {
  return <span className="material-symbols-rounded ax-icon" aria-hidden="true">{children}</span>;
}

export default function AstroExplainer() {
  const [selectedLayer, setSelectedLayer] = useState<LayerKey>("astro");
  const [demoMode, setDemoMode] = useState<DemoMode>("static");

  const selected = useMemo(
    () => layers.find((layer) => layer.key === selectedLayer) ?? layers[1],
    [selectedLayer]
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:opsz,wght@17..18,400;17..18,500;17..18,600;17..18,700&family=Roboto+Mono:wght@400;500;600&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400,0,0&display=swap');
        :root { color-scheme: dark; }
        .ax-root {
          --bg:#0a0d13; --surface:#141923; --surface2:#1b2230; --line:rgba(255,255,255,.1);
          --text:rgba(255,255,255,.93); --muted:rgba(255,255,255,.64); --faint:rgba(255,255,255,.42);
          --purple:#c8a7ff; --orange:#ff9b63; --blue:#82b1ff; --teal:#72e0d1;
          min-height:100vh; color:var(--text); font-family:"Google Sans",system-ui,sans-serif; line-height:1.55;
          background:radial-gradient(circle at 80% 0,rgba(168,108,255,.18),transparent 31rem),
                     radial-gradient(circle at 8% 28%,rgba(255,155,99,.1),transparent 26rem),var(--bg);
        }
        .ax-root *{box-sizing:border-box}.ax-root button,.ax-root a{font:inherit}.ax-root a{color:inherit}
        .ax-shell{width:min(1120px,calc(100% - 32px));margin:auto;padding:28px 0 72px}
        .ax-hero{position:relative;overflow:hidden;padding:clamp(26px,6vw,58px);border:1px solid var(--line);border-radius:28px;
          background:linear-gradient(145deg,rgba(27,31,44,.96),rgba(15,18,26,.93));box-shadow:0 24px 70px rgba(0,0,0,.32)}
        .ax-hero:after{content:"";position:absolute;right:-80px;bottom:-120px;width:340px;height:340px;border-radius:50%;border:48px solid rgba(200,167,255,.08)}
        .ax-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:7px 11px;border-radius:999px;background:rgba(200,167,255,.12);
          color:var(--purple);font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
        .ax-title{max-width:850px;margin:20px 0 12px;font-size:clamp(38px,7vw,74px);line-height:.98;letter-spacing:-.055em}
        .ax-gradient{background:linear-gradient(90deg,var(--orange),var(--purple),var(--blue));background-clip:text;-webkit-background-clip:text;color:transparent}
        .ax-lede{max-width:780px;margin:0;color:var(--muted);font-size:clamp(17px,2.3vw,21px)}
        .ax-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:30px}
        .ax-stat{padding:16px;border:1px solid var(--line);border-radius:17px;background:rgba(255,255,255,.035)}
        .ax-stat strong{display:block;font-size:14px}.ax-stat span{color:var(--muted);font-size:13px}
        .ax-section{margin-top:54px}.ax-head{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:18px}
        .ax-kicker{margin:0 0 5px;color:var(--purple);font-size:12px;font-weight:700;letter-spacing:.09em;text-transform:uppercase}
        .ax-h2{margin:0;font-size:clamp(25px,4vw,38px);line-height:1.08;letter-spacing:-.035em}
        .ax-note{max-width:500px;margin:0;color:var(--muted);font-size:14px}
        .ax-flow{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
        .ax-layer{position:relative;min-height:144px;padding:17px;border:1px solid var(--line);border-radius:18px;color:var(--text);text-align:left;background:var(--surface);cursor:pointer;transition:.2s}
        .ax-layer:hover{transform:translateY(-2px);border-color:rgba(200,167,255,.42)}
        .ax-layer[data-active="true"]{border-color:var(--purple);background:linear-gradient(145deg,rgba(168,108,255,.17),rgba(20,25,35,.96))}
        .ax-layer:not(:last-child):after{content:"arrow_forward";position:absolute;top:50%;right:-18px;z-index:2;color:var(--faint);font-family:"Material Symbols Rounded";transform:translateY(-50%)}
        .ax-icon{font-size:22px;line-height:1}.ax-layer .ax-icon{display:grid;width:38px;height:38px;place-items:center;margin-bottom:17px;border-radius:12px;background:rgba(255,255,255,.07);color:var(--purple)}
        .ax-layer strong{display:block;font-size:15px}.ax-layer small{display:block;margin-top:4px;color:var(--muted);line-height:1.35}
        .ax-detail{display:grid;grid-template-columns:.9fr 1.1fr;gap:18px;margin-top:16px;padding:22px;border:1px solid var(--line);border-radius:21px;background:var(--surface2)}
        .ax-detail-label{display:inline-flex;gap:9px;align-items:center;color:var(--purple);font-weight:700}.ax-detail h3{margin:11px 0 5px;font-size:24px}.ax-detail p{margin:0;color:var(--muted)}
        .ax-analogy{display:flex;align-items:center;gap:14px;padding:17px;border-radius:16px;background:rgba(255,255,255,.045)}
        .ax-analogy .ax-icon{color:var(--orange);font-size:30px}.ax-analogy span{display:block;color:var(--faint);font-size:12px;text-transform:uppercase;letter-spacing:.08em}.ax-analogy strong{font-size:18px}
        .ax-compare{display:grid;grid-template-columns:1fr 1fr;gap:18px}.ax-panel{padding:22px;border:1px solid var(--line);border-radius:21px;background:var(--surface)}
        .ax-toggle{display:inline-flex;padding:4px;border:1px solid var(--line);border-radius:999px;background:#0e1117}.ax-toggle button{border:0;border-radius:999px;padding:8px 13px;color:var(--muted);background:transparent;cursor:pointer}
        .ax-toggle button[data-active="true"]{color:#130d19;background:var(--purple);font-weight:700}
        .ax-ocean{min-height:260px;margin-top:18px;padding:18px;border-radius:18px;background:linear-gradient(rgba(130,177,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(130,177,255,.07) 1px,transparent 1px),#101722;background-size:24px 24px}
        .ax-static{height:100%;padding:15px;border:1px dashed rgba(130,177,255,.34);border-radius:15px}.ax-line{height:10px;margin-bottom:11px;border-radius:999px;background:rgba(255,255,255,.1)}
        .ax-line:nth-child(2){width:72%}.ax-line:nth-child(3){width:86%}.ax-line:nth-child(4){width:58%}
        .ax-island{display:grid;min-height:120px;place-items:center;margin:20px auto 0;border:1px solid rgba(200,167,255,.5);border-radius:18px;background:linear-gradient(145deg,rgba(168,108,255,.24),rgba(255,155,99,.09));text-align:center}
        .ax-island strong,.ax-island span{display:block}.ax-island span{color:var(--muted);font-size:13px}
        .ax-code{overflow:auto;margin:16px 0 0;padding:18px;border:1px solid var(--line);border-radius:16px;background:#090b10;color:#d9e2ff;font:13px/1.7 "Roboto Mono",monospace;white-space:pre}
        .ax-grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.ax-card{padding:21px;border:1px solid var(--line);border-radius:19px;background:var(--surface)}
        .ax-card h3{margin:12px 0 7px;font-size:18px}.ax-card p{margin:0;color:var(--muted);font-size:14px}.ax-card .ax-icon{color:var(--teal)}
        .ax-list{display:grid;gap:10px;margin:20px 0 0;padding:0;list-style:none}.ax-list li{display:grid;grid-template-columns:32px 1fr;gap:10px;align-items:start;color:var(--muted)}
        .ax-list li .ax-icon{display:grid;width:28px;height:28px;place-items:center;border-radius:9px;background:rgba(255,255,255,.06);color:var(--orange);font-size:17px}
        .ax-cloud{display:grid;grid-template-columns:1.15fr .85fr;gap:18px;padding:clamp(22px,4vw,34px);border:1px solid rgba(255,155,99,.3);border-radius:24px;background:linear-gradient(145deg,rgba(255,155,99,.1),rgba(20,25,35,.95))}
        .ax-cloud h3{margin:8px 0 9px;font-size:27px}.ax-cloud p{margin:0;color:var(--muted)}.ax-steps{display:grid;gap:9px;counter-reset:step}
        .ax-step{display:grid;grid-template-columns:31px 1fr;gap:10px;align-items:center;padding:11px;border:1px solid var(--line);border-radius:13px;background:rgba(0,0,0,.18)}
        .ax-step:before{counter-increment:step;content:counter(step);display:grid;width:26px;height:26px;place-items:center;border-radius:50%;background:var(--orange);color:#211006;font-weight:800}
        .ax-sources{margin-top:48px;padding-top:18px;border-top:1px solid var(--line);color:var(--faint);font-size:12px}.ax-sources a{color:var(--muted);text-decoration:none}.ax-sources a:hover{color:var(--purple)}
        @media(max-width:850px){.ax-stats,.ax-grid3{grid-template-columns:repeat(2,1fr)}.ax-flow{grid-template-columns:1fr}.ax-layer{min-height:auto}.ax-layer:not(:last-child):after{content:"arrow_downward";top:auto;right:50%;bottom:-20px;transform:translateX(50%)}.ax-detail,.ax-compare,.ax-cloud{grid-template-columns:1fr}}
        @media(max-width:560px){.ax-shell{width:min(100% - 20px,1120px);padding-top:10px}.ax-hero{border-radius:20px}.ax-stats,.ax-grid3{grid-template-columns:1fr}.ax-section{margin-top:40px}.ax-head{align-items:start;flex-direction:column}.ax-title{font-size:42px}}
        @media(prefers-reduced-motion:reduce){.ax-root *{transition:none!important}}
      `}</style>

      <main className="ax-root">
        <div className="ax-shell">
          <header className="ax-hero">
            <div className="ax-eyebrow"><Icon>orbit</Icon> Web-stack explainer</div>
            <h1 className="ax-title">What is <span className="ax-gradient">Astro?</span></h1>
            <p className="ax-lede">
              Astro is the framework that organizes the website. React can power selected interactive parts,
              Vite performs development and production builds, GitHub stores the source, and Cloudflare Workers publishes the result.
            </p>
            <div className="ax-stats">
              {[['Astro','Framework + routes'],['React','Optional UI islands'],['Vite','Dev server + bundler'],['Workers','Hosting + runtime']].map(([a,b]) => (
                <div className="ax-stat" key={a}><strong>{a}</strong><span>{b}</span></div>
              ))}
            </div>
          </header>

          <section className="ax-section">
            <div className="ax-head">
              <div><p className="ax-kicker">The full pipeline</p><h2 className="ax-h2">Five layers, five different jobs</h2></div>
              <p className="ax-note">Select a layer. These tools cooperate; they are not interchangeable competitors.</p>
            </div>
            <div className="ax-flow">
              {layers.map((layer) => (
                <button type="button" className="ax-layer" data-active={selectedLayer === layer.key} aria-pressed={selectedLayer === layer.key}
                  onClick={() => setSelectedLayer(layer.key)} key={layer.key}>
                  <Icon>{layer.icon}</Icon><strong>{layer.name}</strong><small>{layer.role}</small>
                </button>
              ))}
            </div>
            <div className="ax-detail" aria-live="polite">
              <div><div className="ax-detail-label"><Icon>{selected.icon}</Icon>{selected.role}</div><h3>{selected.name}</h3><p>{selected.description}</p></div>
              <div className="ax-analogy"><Icon>lightbulb</Icon><div><span>Useful analogy</span><strong>{selected.analogy}</strong></div></div>
            </div>
          </section>

          <section className="ax-section">
            <div className="ax-head">
              <div><p className="ax-kicker">Core idea</p><h2 className="ax-h2">HTML ocean, interactive islands</h2></div>
              <div className="ax-toggle" aria-label="Choose rendering example">
                <button type="button" data-active={demoMode === 'static'} onClick={() => setDemoMode('static')}>Static default</button>
                <button type="button" data-active={demoMode === 'island'} onClick={() => setDemoMode('island')}>React island</button>
              </div>
            </div>
            <div className="ax-compare">
              <div className="ax-panel"><div className="ax-ocean"><div className="ax-static"><div className="ax-line"/><div className="ax-line"/><div className="ax-line"/><div className="ax-line"/>
                {demoMode === 'island' && <div className="ax-island"><div><Icon>widgets</Icon><strong>Hydrated React component</strong><span>Only this region needs browser JavaScript.</span></div></div>}
              </div></div></div>
              <div className="ax-panel">
                <p className="ax-kicker">{demoMode === 'static' ? 'No client directive' : 'Opt into interactivity'}</p>
                <h3 style={{marginTop:0}}>{demoMode === 'static' ? 'React can render to plain HTML' : 'Astro hydrates only the chosen component'}</h3>
                <p style={{color:'var(--muted)'}}>{demoMode === 'static'
                  ? 'A component can render without shipping its JavaScript runtime. This is ideal for visual sections that do not need clicks, state, or browser APIs.'
                  : 'Add a client directive for state, event handlers, filters, or other browser behavior. The rest of the page stays lightweight.'}</p>
                <pre className="ax-code">{demoMode === 'static'
? `---\nimport Diagram from "../components/Diagram.tsx";\n---\n\n<Diagram />`
: `---\nimport InteractiveDiagram\n  from "../components/InteractiveDiagram.tsx";\n---\n\n<InteractiveDiagram client:load />`}</pre>
              </div>
            </div>
          </section>

          <section className="ax-section">
            <div className="ax-head"><div><p className="ax-kicker">Why it exists</p><h2 className="ax-h2">Content-first without giving up React</h2></div></div>
            <div className="ax-grid3">
              <article className="ax-card"><Icon>speed</Icon><h3>Less JavaScript by default</h3><p>Astro outputs HTML first and sends browser JavaScript only for components that explicitly need it.</p></article>
              <article className="ax-card"><Icon>extension</Icon><h3>UI-framework freedom</h3><p>React is supported, but Astro can also host Preact, Vue, Svelte, Solid, web components, or plain HTML.</p></article>
              <article className="ax-card"><Icon>route</Icon><h3>File-based site structure</h3><p>Files in <code>src/pages</code> become routes, which suits a growing explainer catalog.</p></article>
            </div>
          </section>

          <section className="ax-section">
            <div className="ax-grid3">
              {[['Excellent fit','Explainers, documentation, portfolios, blogs, landing pages, and content catalogs.','verified'],
                ['Good fit','Hybrid sites where selected sections need React, Vue, Svelte, or another UI framework.','thumb_up'],
                ['Think carefully','Products where nearly every screen is continuously interactive and most state lives in the browser.','balance']].map(([title,text,icon]) => (
                  <article className="ax-card" key={title}><Icon>{icon}</Icon><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </section>

          <section className="ax-section">
            <div className="ax-compare">
              <div className="ax-panel"><p className="ax-kicker">Landscape</p><h2 className="ax-h2" style={{fontSize:29}}>Related alternatives</h2>
                <ul className="ax-list">{alternatives.map(([name,text]) => <li key={name}><Icon>compare_arrows</Icon><div><strong style={{color:'var(--text)'}}>{name}</strong><div>{text}</div></div></li>)}</ul>
              </div>
              <div className="ax-panel"><p className="ax-kicker">Tradeoffs</p><h2 className="ax-h2" style={{fontSize:29}}>Limitations to remember</h2>
                <ul className="ax-list">{limitations.map((text) => <li key={text}><Icon>warning</Icon><div>{text}</div></li>)}</ul>
              </div>
            </div>
          </section>

          <section className="ax-section">
            <div className="ax-cloud">
              <div><p className="ax-kicker">Uppercut Labs deployment model</p><h3>GitHub → Workers Builds → Astro → Vite → Worker</h3>
                <p>Connect the existing <strong>explainers</strong> Worker to a GitHub repository. Every push can build remotely, preserve <code>explainers.uppercut-labs.workers.dev</code>, and deploy every route as one version.</p>
                <pre className="ax-code">{`{\n  "name": "explainers",\n  "compatibility_date": "2026-07-22",\n  "assets": { "directory": "./dist" }\n}`}</pre>
              </div>
              <div className="ax-steps">
                <div className="ax-step">GitHub stores Astro source and TSX components.</div>
                <div className="ax-step">Cloudflare runs <code>npm run build</code>.</div>
                <div className="ax-step">Astro uses Vite to create <code>dist/</code>.</div>
                <div className="ax-step">Cloudflare runs <code>npx wrangler deploy</code>.</div>
                <div className="ax-step">The existing Worker receives the deployment.</div>
              </div>
            </div>
          </section>

          <footer className="ax-sources"><strong>Primary references:</strong>{' '}
            <a href="https://docs.astro.build/en/concepts/why-astro/">Why Astro?</a>{' · '}
            <a href="https://docs.astro.build/en/concepts/islands/">Astro Islands</a>{' · '}
            <a href="https://vite.dev/guide/">Vite overview</a>{' · '}
            <a href="https://developers.cloudflare.com/workers/ci-cd/builds/">Workers Builds</a>{' · '}
            <a href="https://docs.astro.build/en/guides/deploy/cloudflare/">Astro on Cloudflare</a>
          </footer>
        </div>
      </main>
    </>
  );
}
