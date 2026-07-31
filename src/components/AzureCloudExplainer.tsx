import React, { useMemo, useState } from "react";
import "./AzureCloudExplainer.css";
import type { AzureCloudTopic, AzureContentBlock } from "../data/azureCloudTopics/index";
import { azureCloudTopics } from "../data/azureCloudTopics/index";

function RichText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean);
  return <>{parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    return <React.Fragment key={index}>{part}</React.Fragment>;
  })}</>;
}

function Blocks({ blocks }: { blocks: AzureContentBlock[] }) {
  return <div className="ac-blocks">{blocks.map((block, index) => {
    if (block.type === "paragraph") return <p key={index}><RichText text={block.text} /></p>;
    if (block.type === "subheading") return <h3 key={index}><RichText text={block.text} /></h3>;
    if (block.type === "code") return <pre key={index}><code>{block.text}</code></pre>;
    const Tag = block.type === "ordered" ? "ol" : "ul";
    return <Tag key={index}>{block.items.map((item) => <li key={item}><RichText text={item} /></li>)}</Tag>;
  })}</div>;
}

function Icon({ children }: { children: string }) {
  return <span className="material-symbols-rounded" aria-hidden="true">{children}</span>;
}

export default function AzureCloudExplainer({ topic }: { topic: AzureCloudTopic }) {
  const [activeStep, setActiveStep] = useState(0);
  const [openFailure, setOpenFailure] = useState(0);
  const [checked, setChecked] = useState<boolean[]>(() => topic.checklist.map(() => false));
  const currentIndex = useMemo(() => azureCloudTopics.findIndex((entry) => entry.key === topic.key), [topic.key]);
  const previous = currentIndex > 0 ? azureCloudTopics[currentIndex - 1] : null;
  const next = currentIndex < azureCloudTopics.length - 1 ? azureCloudTopics[currentIndex + 1] : null;
  const completed = checked.filter(Boolean).length;

  return (
    <main className="ac-root">

      <div className="ac-shell">
        <nav className="ac-series" aria-label="Azure explainer series">
          {azureCloudTopics.map((entry, index) => <a key={entry.key} href={`/${entry.route}`} data-active={entry.key === topic.key}>{String(index + 1).padStart(2, "0")} · {entry.shortTitle}</a>)}
        </nav>

        <header className="ac-hero">
          <div>
            <div className="ac-kicker"><Icon>cloud</Icon> Azure operations series · {String(currentIndex + 1).padStart(2, "0")} / 12</div>
            <p className="ac-summary">{topic.summary}</p>
          </div>
          <aside className="ac-example">
            <div className="ac-example-label">Running example</div>
            <code>notes.portfolio.example</code>
            <p>A fictional multi-subdomain portfolio keeps the architecture concrete without exposing a real person, domain, subscription, or credential.</p>
          </aside>
        </header>

        <section className="ac-section">
          <div className="ac-head"><div><p className="ac-eyebrow">Mental model</p><h2>What the moving parts mean</h2></div><p className="ac-note">Start here before opening the Portal. The goal is to know what each object is responsible for.</p></div>
          <div className="ac-card"><Blocks blocks={topic.mentalModel} /></div>
        </section>

        {topic.flow.length > 0 && <section className="ac-section">
          <div className="ac-head"><div><p className="ac-eyebrow">Request path</p><h2>{topic.flowTitle}</h2></div><p className="ac-note">Tap a step to isolate the responsibility at that point in the path.</p></div>
          <div className="ac-flow">{topic.flow.map((step, index) => <button className="ac-step" key={step} data-active={activeStep === index} onClick={() => setActiveStep(index)}><span className="ac-step-num">{String(index + 1).padStart(2, "0")}</span><span><RichText text={step} /></span></button>)}</div>
          <div className="ac-step-detail"><Icon>route</Icon><div><strong>Step {activeStep + 1}</strong><br/><RichText text={topic.flow[activeStep]} /></div></div>
        </section>}

        {topic.sections.map((section) => <section className="ac-section" key={section.title}>
          <div className="ac-head"><div><p className="ac-eyebrow">Operations detail</p><h2>{section.title}</h2></div></div>
          <div className="ac-card"><Blocks blocks={section.blocks} /></div>
        </section>)}

        <section className="ac-section">
          <div className="ac-head"><div><p className="ac-eyebrow">Shared responsibility</p><h2>Azure's job versus your job</h2></div><p className="ac-note">Managed service means Azure operates the platform. It does not mean Azure owns your application decisions.</p></div>
          <div className="ac-grid2">
            <div className="ac-card ac-owner"><h3><Icon>verified_user</Icon> Azure manages</h3>{topic.azureManages.map((group, index) => <div className="ac-group" key={index}>{group.title && <h4>{group.title}</h4>}<ul>{group.items.map((item) => <li key={item}><RichText text={item} /></li>)}</ul></div>)}</div>
            <div className="ac-card ac-owner user"><h3><Icon>person</Icon> You manage</h3>{topic.youManage.map((group, index) => <div className="ac-group" key={index}>{group.title && <h4>{group.title}</h4>}<ul>{group.items.map((item) => <li key={item}><RichText text={item} /></li>)}</ul></div>)}</div>
          </div>
        </section>

        <section className="ac-section">
          <div className="ac-head"><div><p className="ac-eyebrow">Failure modes</p><h2>Where this usually breaks</h2></div><p className="ac-note">Open each failure to connect a symptom to the layer that owns it.</p></div>
          <div className="ac-failures">{topic.failures.map((failure, index) => <div className="ac-failure" key={failure.title}><button data-open={openFailure === index} onClick={() => setOpenFailure(openFailure === index ? -1 : index)}><span>{failure.title}</span><Icon>add</Icon></button>{openFailure === index && <p><RichText text={failure.detail} /></p>}</div>)}</div>
        </section>

        <section className="ac-section">
          <div className="ac-head"><div><p className="ac-eyebrow">Portal map</p><h2>Where to look in Azure</h2></div><p className="ac-note">Use the Portal as a map of resource state, not as a substitute for understanding the request path.</p></div>
          <div className="ac-portal-grid">{topic.portal.map((group, index) => <div className="ac-card ac-portal" key={index}><h3><Icon>space_dashboard</Icon>{group.title ?? "Relevant sections"}</h3><ul>{group.items.map((item) => <li key={item}><RichText text={item} /></li>)}</ul></div>)}</div>
        </section>

        <section className="ac-section">
          <div className="ac-head"><div><p className="ac-eyebrow">Verification</p><h2>Five checks before calling it done</h2></div><p className="ac-note">{completed} of {topic.checklist.length} confirmed in this browser session.</p></div>
          <div className="ac-progress" aria-hidden="true"><span style={{width:`${(completed / topic.checklist.length) * 100}%`}} /></div>
          <div className="ac-checklist">{topic.checklist.map((item, index) => <button className="ac-check" data-checked={checked[index]} key={item} onClick={() => setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))}><span className="ac-box"><Icon>check</Icon></span><span><RichText text={item} /></span></button>)}</div>
        </section>

        <section className="ac-section">
          <div className="ac-head"><div><p className="ac-eyebrow">Primary documentation</p><h2>Official references</h2></div></div>
          <div className="ac-sources">{topic.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label}</a>)}</div>
        </section>

        <nav className="ac-nav" aria-label="Azure explainer navigation">
          {previous ? <a href={`/${previous.route}`}><span>Previous</span><strong>← {previous.shortTitle}</strong></a> : <div className="empty" />}
          {next ? <a href={`/${next.route}`}><span>Next</span><strong>{next.shortTitle} →</strong></a> : <a href="/"><span>Series complete</span><strong>Back to all explainers →</strong></a>}
        </nav>
      </div>
    </main>
  );
}
