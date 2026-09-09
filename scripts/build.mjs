import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://thecyberlocal.github.io";
const portraitUrl = `${siteUrl}/assets/images/timothy-macfarlane.png`;

const links = {
  github: "https://github.com/TheCyberLocal",
  linkedin: "https://www.linkedin.com/in/tzm01",
  strling: "https://strling-lang.netlify.app/",
  strlingCode: "https://github.com/strling-lang/strling",
  email: "mailto:timdiscovers@gmail.com",
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work/" },
  { label: "Approach", href: "/approach/" },
  { label: "Background", href: "/background/" },
  { label: "About", href: "/about/" },
];

const personId = `${siteUrl}/#timothy-macfarlane`;

function personSchema() {
  return {
    "@type": "Person",
    "@id": personId,
    name: "Timothy Macfarlane",
    alternateName: "TheCyberLocal",
    url: `${siteUrl}/`,
    image: portraitUrl,
    jobTitle: "Software Architect & Engineer",
    description:
      "Timothy Macfarlane is a software architect and engineer whose work spans application architecture, software modernization, testing and assurance, release engineering, production systems, and developer tooling.",
    sameAs: [links.github, links.linkedin],
    knowsAbout: [
      "software architecture",
      "software assurance",
      "release engineering",
      "developer tooling",
      "compiler engineering",
      "ASP.NET Core",
      "SQL Server",
      "software modernization",
      "AI-assisted engineering",
      "testing architecture",
      "reproducible software engineering",
    ],
  };
}

function graph(...entities) {
  return {
    "@context": "https://schema.org",
    "@graph": [personSchema(), ...entities],
  };
}

function icon(name) {
  const paths = {
    arrow:
      '<path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    external:
      '<path d="M14 5h5v5M11 13l8-8M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    github:
      '<path d="M12 2.7a9.4 9.4 0 0 0-3 18.3c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.4-2.3-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7 3.6 3.6 0 0 1 .1-2.7s.9-.3 2.8 1a9.6 9.6 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1a3.6 3.6 0 0 1 .1 2.7 3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.7c0 .3.2.6.7.5a9.4 9.4 0 0 0-3-18.3Z" fill="currentColor"/>',
    linkedin:
      '<path d="M6.3 8.1H3.2V21h3.1V8.1ZM4.8 3A1.8 1.8 0 1 0 4.8 6.6 1.8 1.8 0 0 0 4.8 3ZM21 13.6c0-3.9-2.1-5.7-4.8-5.7-2.2 0-3.2 1.2-3.8 2.1V8.1H9.3V21h3.1v-7.2c0-1.9.4-3.8 2.8-3.8 2.3 0 2.4 2.2 2.4 3.9V21H21v-7.4Z" fill="currentColor"/>',
    mail: '<path d="M4 6h16v12H4zM4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  };
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
}

function textLink(
  label,
  href,
  { external = false, className = "text-link" } = {},
) {
  return `<a class="${className}" href="${href}"${external ? ' rel="noopener noreferrer"' : ""}>${label}${icon(external ? "external" : "arrow")}</a>`;
}

function isCurrent(itemHref, currentPath) {
  if (itemHref === "/") return currentPath === "/";
  return currentPath.startsWith(itemHref);
}

function header(currentPath) {
  return `
    <header class="site-header" data-site-header>
      <div class="shell header-inner">
        <a class="site-brand" href="/" aria-label="Timothy Macfarlane, home">
          <span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span>
          <span class="brand-copy">
            <span class="brand-name">Timothy Macfarlane</span>
            <span class="brand-role">Software Architect &amp; Engineer</span>
          </span>
        </a>
        <button class="menu-button" type="button" aria-expanded="false" aria-controls="primary-navigation">
          <span class="menu-label">Menu</span>
          <span class="menu-lines" aria-hidden="true"><span></span><span></span></span>
        </button>
        <nav class="primary-nav" id="primary-navigation" aria-label="Primary navigation">
          <ul>
            ${navItems
              .map(
                (item) =>
                  `<li><a href="${item.href}"${isCurrent(item.href, currentPath) ? ' aria-current="page"' : ""}>${item.label}</a></li>`,
              )
              .join("")}
          </ul>
        </nav>
      </div>
    </header>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="shell footer-grid">
        <div class="footer-identity">
          <p class="footer-name">Timothy Macfarlane</p>
          <p>Software Architect &amp; Engineer</p>
          <p class="footer-note">Application architecture, modernization, software assurance, release engineering, and developer tooling.</p>
        </div>
        <nav class="footer-nav" aria-label="Footer navigation">
          <p class="footer-heading">Explore</p>
          <ul>${navItems.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("")}</ul>
        </nav>
        <div class="footer-links">
          <p class="footer-heading">Elsewhere</p>
          <ul>
            <li><a href="${links.github}" rel="me noopener noreferrer">GitHub ${icon("external")}</a></li>
            <li><a href="${links.linkedin}" rel="me noopener noreferrer">LinkedIn ${icon("external")}</a></li>
            <li><a href="${links.strling}" rel="noopener noreferrer">STRling ${icon("external")}</a></li>
            <li><a href="${links.email}">timdiscovers@gmail.com ${icon("mail")}</a></li>
          </ul>
        </div>
      </div>
      <div class="shell footer-base">
        <p>&copy; ${new Date().getFullYear()} Timothy Macfarlane</p>
        <p>Built and maintained by Timothy Macfarlane.</p>
      </div>
    </footer>`;
}

function breadcrumb(items) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${items
    .map((item, index) =>
      index === items.length - 1
        ? `<li aria-current="page">${item.label}</li>`
        : `<li><a href="${item.href}">${item.label}</a></li>`,
    )
    .join("")}</ol></nav>`;
}

function layout({
  title,
  description,
  pagePath,
  body,
  schema,
  pageType = "website",
  noIndex = false,
}) {
  const canonical = `${siteUrl}${pagePath}`;
  const fullTitle =
    title === "Timothy Macfarlane"
      ? `${title} | Software Architect & Engineer`
      : `${title} | Timothy Macfarlane`;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${fullTitle}</title>
    <meta name="description" content="${description}">
    ${noIndex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
    <link rel="canonical" href="${canonical}">
    <meta name="author" content="Timothy Macfarlane">
    <meta name="theme-color" content="#0B0F14">
    <meta property="og:site_name" content="Timothy Macfarlane">
    <meta property="og:type" content="${pageType}">
    <meta property="og:title" content="${fullTitle}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${portraitUrl}">
    <meta property="og:image:width" content="976">
    <meta property="og:image:height" content="976">
    <meta property="og:image:alt" content="Portrait of Timothy Macfarlane">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${fullTitle}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${portraitUrl}">
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/assets/css/site.css">
    <script>document.documentElement.classList.add("js");</script>
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
  </head>
  <body>
    <a class="skip-link" href="#main-content">Skip to main content</a>
    ${header(pagePath)}
    <main id="main-content">${body}</main>
    ${footer()}
    <script src="/assets/js/site.js" defer></script>
  </body>
</html>`;
}

function homePage() {
  const description =
    "Timothy Macfarlane is a software architect and engineer working across application architecture, software assurance, modernization, release engineering, and developer tooling.";
  const schema = graph(
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Timothy Macfarlane",
      description,
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile-page`,
      url: `${siteUrl}/`,
      name: "Timothy Macfarlane | Software Architect & Engineer",
      mainEntity: { "@id": personId },
      isPartOf: { "@id": `${siteUrl}/#website` },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": `${siteUrl}/work/strling/#project`,
      name: "STRling",
      description:
        "A string-pattern DSL and compiler designed to make regular expressions composable, inspectable, and maintainable across language ecosystems.",
      url: links.strling,
      codeRepository: links.strlingCode,
      creator: { "@id": personId },
      programmingLanguage: ["Rust", "TypeScript", "Python"],
    },
  );

  const body = `
    <section class="hero home-hero" aria-labelledby="home-title">
      <div class="shell hero-grid">
        <div class="hero-copy">
          <p class="eyebrow"><span>Timothy Macfarlane</span> Software Architect &amp; Engineer</p>
          <h1 id="home-title">Engineering important decisions into repeatable systems.</h1>
          <p class="hero-lede">When a software problem matters, Timothy starts with the outcome that has to be true and works backward through the assumptions behind it. He turns the resulting rules into software, tests, tooling, and release mechanisms that can be verified and repeated.</p>
          <div class="hero-actions" aria-label="Primary links">
            ${textLink("View selected work", "/work/", { className: "button button-primary" })}
            ${textLink("Read the approach", "/approach/", { className: "button button-secondary" })}
          </div>
          <div class="identity-links" aria-label="Public profiles">
            <a href="${links.github}" rel="me noopener noreferrer">${icon("github")} GitHub</a>
            <a href="${links.linkedin}" rel="me noopener noreferrer">${icon("linkedin")} LinkedIn</a>
          </div>
        </div>
        <figure class="portrait-block">
          <div class="portrait-frame">
            <img src="/assets/images/timothy-macfarlane.png" width="850" height="850" alt="Timothy Macfarlane wearing a dark jacket" fetchpriority="high">
            <div class="portrait-index" aria-hidden="true"><span>01</span><span>Identity</span></div>
          </div>
          <figcaption>Timothy publishes code as TheCyberLocal and develops STRling, an open-source regex DSL and compiler.</figcaption>
        </figure>
      </div>
    </section>

    <section class="section selected-work" aria-labelledby="selected-work-title">
      <div class="shell">
        <div class="section-heading split-heading">
          <div><p class="eyebrow">Selected work</p><h2 id="selected-work-title">Selected projects and the engineering decisions behind them.</h2></div>
          <p>These case studies cover the problem, constraints, architectural decisions, implementation work, verification, and outcome behind each project.</p>
        </div>
        <div class="project-grid">
          <article class="project-card portal-card">
            <div class="card-visual assurance-visual" aria-hidden="true">
              <div class="visual-topline"><span>Release evidence</span><span>06 controls</span></div>
              <div class="evidence-bars"><i></i><i></i><i></i><i></i><i></i><i></i></div>
              <div class="visual-status"><span></span> release confidence backed by evidence</div>
            </div>
            <div class="card-content">
              <div class="card-meta"><span>Enterprise application</span><span>Software assurance</span></div>
              <h3>Agent Portal</h3>
              <p>A production application case study on turning testing, contracts, security, deployment, and recovery into a repeatable release process.</p>
              ${textLink("Read the Agent Portal case study", "/work/agent-portal/")}
            </div>
          </article>
          <article class="project-card strling-card">
            <div class="card-visual compiler-visual" aria-hidden="true">
              <div class="compiler-node"><span>DSL</span></div><b></b>
              <div class="compiler-node"><span>AST</span></div><b></b>
              <div class="compiler-node"><span>IR</span></div><b></b>
              <div class="compiler-node accent"><span>Emit</span></div>
            </div>
            <div class="card-content">
              <div class="card-meta"><span>Independent project</span><span>Compiler tooling</span></div>
              <h3>STRling</h3>
              <p>A DSL and compiler that turns regex from opaque strings into structured, target-aware software with consistent behavior across language ecosystems.</p>
              ${textLink("Read the STRling case study", "/work/strling/")}
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section process-section" aria-labelledby="process-title">
      <div class="shell">
        <div class="section-heading narrow-heading"><p class="eyebrow">How Timothy works</p><h2 id="process-title">How Timothy turns an important problem into a verified, repeatable solution.</h2></div>
        <ol class="process-flow" aria-label="Timothy Macfarlane's engineering reasoning process">
          <li><span>01</span><strong>Question the formulation</strong></li>
          <li><span>02</span><strong>Expose assumptions</strong></li>
          <li><span>03</span><strong>Define the rule</strong></li>
          <li><span>04</span><strong>Build the mechanism</strong></li>
          <li><span>05</span><strong>Verify the evidence</strong></li>
          <li><span>06</span><strong>Verify evidence adequacy</strong></li>
          <li><span>07</span><strong>Make it reproducible</strong></li>
        </ol>
        <div class="section-link">${textLink("Read the full engineering approach", "/approach/")}</div>
      </div>
    </section>

    <section class="section direction-section" aria-labelledby="direction-title">
      <div class="shell direction-grid">
        <div class="section-heading"><p class="eyebrow">Direction</p><h2 id="direction-title">Current strengths and the areas Timothy is pushing further.</h2></div>
        <div class="direction-columns">
          <article>
            <p class="label">Current work</p>
            <h3>Production systems from application behavior through release</h3>
            <p>Application architecture, modernization, data systems, testing, software assurance, release engineering, and operational reliability.</p>
          </article>
          <article>
            <p class="label">Going deeper</p>
            <h3>Languages, compilers, and advanced tooling</h3>
            <p>Deeper systems work, compiler engineering, language design, developer infrastructure, and tools that make complex correctness properties inspectable.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section human-section" aria-labelledby="human-title">
      <div class="shell human-grid">
        <div><p class="eyebrow">Beyond the work</p><h2 id="human-title">Outside engineering.</h2></div>
        <div><p>Timothy plays piano, listens heavily to electronic music, plays pickleball, and spends time with philosophy, science, rationality, audiobooks, speculative fiction, and anime.</p>${textLink("More about Timothy", "/about/")}</div>
      </div>
    </section>`;

  return layout({
    title: "Timothy Macfarlane",
    description,
    pagePath: "/",
    body,
    schema,
  });
}

function workPage() {
  const description =
    "Selected engineering work by Timothy Macfarlane, including Agent Portal software assurance and STRling compiler architecture.";
  const schema = graph({
    "@type": "CollectionPage",
    "@id": `${siteUrl}/work/#page`,
    url: `${siteUrl}/work/`,
    name: "Selected Work | Timothy Macfarlane",
    description,
    author: { "@id": personId },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          url: `${siteUrl}/work/agent-portal/`,
          name: "Agent Portal",
        },
        {
          "@type": "ListItem",
          position: 2,
          url: `${siteUrl}/work/strling/`,
          name: "STRling",
        },
      ],
    },
  });
  const body = `
    <section class="page-hero" aria-labelledby="work-title">
      <div class="shell page-hero-grid">
        <div>${breadcrumb([{ label: "Home", href: "/" }, { label: "Work" }])}<p class="eyebrow">Curated engineering work</p><h1 id="work-title">Engineering work shaped by constraints, architecture, and verification.</h1></div>
        <div class="page-intro"><p>A small set of projects chosen because the engineering decisions are as important as the implementation.</p><p>Each case study covers the problem, constraints, design decisions, implementation, verification, and outcome.</p></div>
      </div>
    </section>
    <section class="section work-list" aria-labelledby="featured-title">
      <div class="shell">
        <h2 id="featured-title" class="visually-hidden">Featured work</h2>
        <article class="work-entry">
          <div class="work-number">01</div>
          <div class="work-summary">
            <div class="card-meta"><span>Enterprise application</span><span>Architecture and assurance</span></div>
            <h3>Agent Portal</h3>
            <p class="work-lede">A green test run was not enough to establish release readiness. Verification had to cover behavior, access control, contracts, dependencies, deployment, and recovery.</p>
            <dl class="capability-list">
              <div><dt>Problem</dt><dd>Legacy behavior, changing workflows, and release confidence crossed application, data, browser, and infrastructure boundaries.</dd></div>
              <div><dt>Non-obvious point</dt><dd>Passing checks matter only if they cover the properties required for release.</dd></div>
              <div><dt>Responsibility</dt><dd>Application architecture, workflow modeling, contract hardening, testing architecture, release engineering, performance, and production operations.</dd></div>
              <div><dt>Demonstrates</dt><dd>Software assurance, production application engineering, browser verification, staged delivery, and explicit recovery design.</dd></div>
            </dl>
            ${textLink("Read the case study", "/work/agent-portal/", { className: "button button-secondary" })}
          </div>
          <div class="work-aside assurance-aside" aria-hidden="true"><span>Behavior</span><span>Security</span><span>Contracts</span><span>Deploy</span><span>Rollback</span></div>
        </article>
        <article class="work-entry">
          <div class="work-number">02</div>
          <div class="work-summary">
            <div class="card-meta"><span>Independent project</span><span>Language and developer tooling</span></div>
            <h3>STRling</h3>
            <p class="work-lede">Raw regular expressions compress structure and intent into strings. STRling moves that knowledge into a DSL, AST, intermediate representation, and target emitters so patterns can be composed, inspected, tested, and reproduced.</p>
            <dl class="capability-list">
              <div><dt>Problem</dt><dd>Regex is powerful, but string-based construction makes composition, review, portability, and long-term maintenance fragile.</dd></div>
              <div><dt>Non-obvious point</dt><dd>A helper API could improve syntax but could not establish a shared semantic model across target engines.</dd></div>
              <div><dt>Responsibility</dt><dd>Language design, compiler architecture, cross-language consistency, package structure, tests, documentation, and distribution.</dd></div>
              <div><dt>Demonstrates</dt><dd>DSL design, AST and IR modeling, target emission, conformance thinking, reproducible tooling, and independent technical direction.</dd></div>
            </dl>
            ${textLink("Read the case study", "/work/strling/", { className: "button button-secondary" })}
          </div>
          <div class="work-aside compiler-aside" aria-hidden="true"><span>DSL</span><b></b><span>AST</span><b></b><span>IR</span><b></b><span>Emit</span></div>
        </article>
      </div>
    </section>
    <section class="section selection-note" aria-labelledby="selection-title"><div class="shell note-grid"><p class="eyebrow">Why these projects</p><div><h2 id="selection-title">A small set of projects, chosen for depth.</h2><p>GitHub contains broader implementation history and public code, while LinkedIn contains professional activity and technical posts. This site highlights the projects with enough depth to explain the engineering behind them.</p><div class="inline-links">${textLink("TheCyberLocal on GitHub", links.github, { external: true })}${textLink("Timothy on LinkedIn", links.linkedin, { external: true })}</div></div></div></section>`;
  return layout({
    title: "Selected Work",
    description,
    pagePath: "/work/",
    body,
    schema,
  });
}

function agentPortalPage() {
  const description =
    "Agent Portal case study by Timothy Macfarlane covering production application architecture, testing, release engineering, deployment, and recovery.";
  const schema = graph({
    "@type": "TechArticle",
    "@id": `${siteUrl}/work/agent-portal/#case-study`,
    url: `${siteUrl}/work/agent-portal/`,
    headline:
      "Agent Portal: Building an Evidence System for Release Confidence",
    description,
    author: { "@id": personId },
    about: [
      "software assurance",
      "application architecture",
      "testing architecture",
      "release engineering",
      "operational reliability",
      "reproducible software engineering",
    ],
  });
  const body = `
    <article>
      <header class="case-hero agent-hero">
        <div class="shell">
          ${breadcrumb([{ label: "Home", href: "/" }, { label: "Work", href: "/work/" }, { label: "Agent Portal" }])}
          <div class="case-title-grid">
            <div><p class="eyebrow">Case study 01 <span>Enterprise application</span></p><h1>Agent Portal</h1><p class="case-subtitle">Building an evidence system for application correctness, release readiness, and operational recovery.</p></div>
            <dl class="case-facts">
              <div><dt>Scope</dt><dd>Architecture through production operations</dd></div>
              <div><dt>Environment</dt><dd>Private production web application</dd></div>
              <div><dt>Primary lens</dt><dd>Software assurance and reproducibility</dd></div>
              <div><dt>Disclosure</dt><dd>Sensitive implementation details omitted</dd></div>
            </dl>
          </div>
          <div class="case-diagram evidence-system" aria-label="A conclusion is supported by evidence from behavior, security, contracts, deployment, and rollback, with coverage validating evidence adequacy">
            <div class="conclusion-node"><span>Conclusion</span><strong>Release ready</strong></div>
            <div class="evidence-rail" aria-hidden="true"></div>
            <div class="evidence-nodes"><span>Behavior</span><span>Security</span><span>Contracts</span><span>Deployment</span><span>Rollback</span></div>
            <div class="coverage-band"><span>Coverage and evidence adequacy</span></div>
          </div>
        </div>
      </header>

      <div class="shell case-layout">
        <aside class="case-index" aria-label="Case study contents">
          <p class="label">Case index</p>
          <ol>
            <li><a href="#apparent-problem">Apparent problem</a></li>
            <li><a href="#actual-question">Actual question</a></li>
            <li><a href="#hidden-assumptions">Hidden assumptions</a></li>
            <li><a href="#constraints">Constraints</a></li>
            <li><a href="#decision">Decision</a></li>
            <li><a href="#implementation">Implementation</a></li>
            <li><a href="#verification">Verification</a></li>
            <li><a href="#evidence-adequacy">Evidence adequacy</a></li>
            <li><a href="#outcome">Outcome</a></li>
          </ol>
        </aside>
        <div class="case-content">
          <section id="apparent-problem" class="case-section"><p class="section-number">01</p><h2>Apparent Problem</h2><p class="lead">Requests arrived as individual changes: normalize a workflow, improve a report, harden a contract, fix a release problem, or automate a browser path.</p><p>Each change could work locally while release readiness remained unproven. A successful fix did not by itself establish that the application was still functional, secure, deployable, and recoverable.</p></section>

          <section id="actual-question" class="case-section"><p class="section-number">02</p><h2>Actual Question</h2><div class="question-callout"><p>What evidence is sufficient to conclude that this application behaves as required, preserves the contracts that matter, can be released safely, and can be restored when a release fails?</p></div><p>That changed the scope. The application, data layer, test environment, deployment process, and recovery path all had to be evaluated together.</p></section>

          <section id="hidden-assumptions" class="case-section"><p class="section-number">03</p><h2>Hidden Assumptions</h2><p>The initial tasks carried conclusions that their available evidence could not fully support.</p><ul class="assumption-list">
            <li><span>A1</span><div><strong>Green tests cover the behavior that matters.</strong><p>That is true only when the tests exercise the workflows, boundaries, roles, and failure paths relevant to the release.</p></div></li>
            <li><span>A2</span><div><strong>Existing behavior is a coherent specification.</strong><p>Legacy behavior can contain contradictions, accidental coupling, and rules that live only in operator memory.</p></div></li>
            <li><span>A3</span><div><strong>Application and data contracts agree.</strong><p>Model validation, database constraints, serialization, and integration expectations can each enforce a different rule.</p></div></li>
            <li><span>A4</span><div><strong>A successful build is a production-ready release.</strong><p>Artifact creation does not prove environment readiness, authorization, acceptance behavior, or recovery.</p></div></li>
            <li><span>A5</span><div><strong>The verification process is repeatable.</strong><p>A correct sequence performed manually once may still fail as a recurring release mechanism.</p></div></li>
          </ul></section>

          <section id="constraints" class="case-section"><p class="section-number">04</p><h2>Constraints</h2><div class="constraint-grid">
            <article><h3>Live operational context</h3><p>Business workflows and reporting needs continued while behavior was normalized and verification became more comprehensive.</p></article>
            <article><h3>Established platform</h3><p>A mature Microsoft web application, relational data layer, browser workflows, and established production infrastructure formed the practical system boundary.</p></article>
            <article><h3>Legacy knowledge</h3><p>Some requirements were embedded in existing code, data shape, reports, or human procedure rather than an explicit contract.</p></article>
            <article><h3>Safe disclosure</h3><p>Private source, production data, customer information, credentials, and proprietary operational details remain outside this case study.</p></article>
          </div></section>

          <section id="decision" class="case-section"><p class="section-number">05</p><h2>Decision</h2><p class="lead">Treat release confidence as an evidence system, not a test-suite status.</p><p>For every release claim, define the property that must hold, how it is enforced, what evidence checks it, what coverage is required, and what happens when it cannot be established.</p><div class="decision-model" aria-label="Property leads to rule, mechanism, evidence, coverage, and gate"><span>Property</span><b></b><span>Rule</span><b></b><span>Mechanism</span><b></b><span>Evidence</span><b></b><span>Coverage</span><b></b><span>Gate</span></div><p>Rules were assigned to explicit boundaries: contracts, application code, configuration, tests, and deployment automation.</p></section>

          <section id="implementation" class="case-section"><p class="section-number">06</p><h2>Implementation</h2><div class="implementation-list">
            <article><span>Application</span><div><h3>Normalize behavior at explicit boundaries</h3><p>Workflow rules were moved out of scattered UI assumptions and into server-side validation, domain behavior, and durable data constraints where appropriate.</p></div></article>
            <article><span>Contracts</span><div><h3>Make integration expectations inspectable</h3><p>Request shape, authorization, persistence behavior, and downstream assumptions were hardened so incompatible states could fail clearly and early.</p></div></article>
            <article><span>Browser</span><div><h3>Exercise behavior where users experience it</h3><p>Playwright automation covered consequential browser journeys, including role-sensitive behavior and the integration between rendered UI, application logic, and data.</p></div></article>
            <article><span>Release</span><div><h3>Encode the route to production</h3><p>Deterministic profiles, hard gates, staged deployment automation, and acceptance checks made the release process repeatable instead of relying on remembered steps.</p></div></article>
            <article><span>Recovery</span><div><h3>Make rollback an explicit behavior</h3><p>The release mechanism included an explicit recovery path capable of reversing a failed release when acceptance checks did not hold.</p></div></article>
            <article><span>Reporting</span><div><h3>Optimize the delivery model</h3><p>A reporting performance investigation showed that much of the perceived latency came from the delivery model rather than report computation itself. Moving from complete-document generation toward interactive rendering substantially reduced time to first useful content.</p></div></article>
          </div></section>

          <section id="verification" class="case-section"><p class="section-number">07</p><h2>Verification</h2><p>Different properties required different evidence. No single test layer was allowed to stand in for all of them.</p><div class="evidence-table-wrap"><table class="evidence-table"><thead><tr><th>Property</th><th>Evidence mechanism</th><th>What it can establish</th></tr></thead><tbody>
            <tr><td>Behavior</td><td>Browser journeys and integration tests</td><td>Observed workflows operate through real application boundaries.</td></tr>
            <tr><td>Contracts</td><td>Validation, structural checks, and contract tests</td><td>Inputs, outputs, persistence, and integrations obey defined shapes and rules.</td></tr>
            <tr><td>Security</td><td>Role-aware scenarios and security checks</td><td>Protected behavior is evaluated under the identities and paths that matter.</td></tr>
            <tr><td>Dependencies</td><td>Direct and transitive analysis</td><td>Known package risk is evaluated beyond top-level references.</td></tr>
            <tr><td>Artifact</td><td>Deterministic build and syntax checks</td><td>The candidate release is structurally valid and reproducibly produced.</td></tr>
            <tr><td>Deployment</td><td>Deployment and acceptance validation</td><td>The candidate operates correctly in its target environment.</td></tr>
            <tr><td>Recovery</td><td>Verified recovery procedure</td><td>Failed releases have a defined and reproducible reversal path.</td></tr>
          </tbody></table></div></section>

          <section id="evidence-adequacy" class="case-section"><p class="section-number">08</p><h2>Evidence Adequacy</h2><p class="lead">A check is useful only within the boundary of what it actually observes.</p><p>Browser tests can demonstrate selected journeys, but they do not establish that every authorization boundary was exercised. Dependency scanning can detect known vulnerability data, but it does not establish business correctness. An availability check can report process status without proving a release's critical workflow.</p><p>Adequacy therefore required a second layer of questions:</p><ul class="check-list"><li>Which required behaviors have no corresponding evidence?</li><li>Which roles, branches, integrations, or deployment states are outside the exercised set?</li><li>Does the evidence run against the same artifact and configuration being evaluated?</li><li>Can a failed check block the transition it is meant to govern?</li><li>Can another engineer reproduce the conclusion from the same inputs?</li></ul><div class="principle-block"><p class="label">Governing principle</p><p>A release gate should fail when release readiness cannot be established, not only when an implementation step errors.</p></div></section>

          <section id="outcome" class="case-section"><p class="section-number">09</p><h2>Outcome</h2><p class="lead">The result was a clearer route from change to release: explicit rules, repeatable verification, defined coverage, and a tested recovery path.</p><p>Application behavior, data, browser workflows, security, reporting, delivery, and recovery were evaluated as parts of the same release process. The result depended less on remembered procedure, and failed gates identified the property that had not been established.</p><div class="metric-note"><strong>Performance example</strong><p>A reporting performance investigation showed that the main source of perceived latency was the delivery model rather than report computation. Changing how results became available substantially reduced time to first useful content.</p></div><p class="disclosure-note">This case study describes the engineering decisions at a public-safe level and omits confidential implementation, data, and operational details.</p></section>

          <nav class="case-next" aria-label="Next case study"><p class="eyebrow">Next case study</p><a href="/work/strling/"><span>STRling</span><strong>From helper API to compiler architecture</strong>${icon("arrow")}</a></nav>
        </div>
      </div>
    </article>`;
  return layout({
    title: "Agent Portal Case Study",
    description,
    pagePath: "/work/agent-portal/",
    body,
    schema,
    pageType: "article",
  });
}

function strlingPage() {
  const description =
    "STRling case study by Timothy Macfarlane: a maintainable regex DSL and compiler architecture using an AST, intermediate representation, target emission, testing, and polyglot conformance.";
  const schema = graph({
    "@type": "SoftwareSourceCode",
    "@id": `${siteUrl}/work/strling/#project`,
    name: "STRling",
    headline: "STRling: From Regex Helper to Compiler Architecture",
    description,
    url: links.strling,
    codeRepository: links.strlingCode,
    creator: { "@id": personId },
    programmingLanguage: ["Rust", "TypeScript", "Python"],
    keywords:
      "STRling compiler, DSL, AST, intermediate representation, regex, developer tooling",
  });
  const body = `
    <article>
      <header class="case-hero strling-hero">
        <div class="shell">
          ${breadcrumb([{ label: "Home", href: "/" }, { label: "Work", href: "/work/" }, { label: "STRling" }])}
          <div class="case-title-grid">
            <div><p class="eyebrow">Case study 02 <span>Independent project</span></p><h1>STRling</h1><p class="case-subtitle">A compiler and DSL for building regex as structured, target-aware software.</p><div class="hero-actions">${textLink("Visit the STRling website", links.strling, { external: true, className: "button button-primary" })}${textLink("View source", links.strlingCode, { external: true, className: "button button-secondary" })}</div></div>
            <dl class="case-facts">
              <div><dt>Category</dt><dd>DSL and compiler tooling</dd></div>
              <div><dt>Architecture</dt><dd>DSL to AST to IR to target emitter</dd></div>
              <div><dt>Primary concern</dt><dd>Consistent behavior across languages and regex engines</dd></div>
              <div><dt>Project site</dt><dd>strling-lang.netlify.app</dd></div>
            </dl>
          </div>
          <div class="strling-pipeline" aria-label="STRling compiler pipeline: a developer-authored DSL becomes an abstract syntax tree, then a target-neutral intermediate representation, then target regex output">
            <div><span>Author</span><strong>STRling DSL</strong></div><b aria-hidden="true"></b><div><span>Parse</span><strong>AST</strong></div><b aria-hidden="true"></b><div><span>Compile</span><strong>IR</strong></div><b aria-hidden="true"></b><div class="pipeline-output"><span>Emit</span><strong>Target regex</strong></div>
          </div>
        </div>
      </header>

      <div class="shell case-layout">
        <aside class="case-index" aria-label="Case study contents"><p class="label">Case index</p><ol>
          <li><a href="#strling-problem">Problem</a></li><li><a href="#strling-evolution">Why a compiler</a></li><li><a href="#strling-architecture">Architecture</a></li><li><a href="#strling-polyglot">Polyglot consistency</a></li><li><a href="#strling-verification">Verification</a></li><li><a href="#strling-distribution">Distribution</a></li><li><a href="#strling-value">Engineering value</a></li>
        </ol></aside>
        <div class="case-content">
          <section id="strling-problem" class="case-section"><p class="section-number">01</p><h2>The Problem With Raw Regex</h2><p class="lead">Regular expressions are powerful, but raw pattern strings hide much of the structure developers need to understand and maintain.</p><p>A raw pattern hides boundaries between concepts. Composition can change precedence or capture behavior. Engine-specific details leak into application code. Reviewers must mentally reconstruct intent from punctuation, and long-term maintenance depends on somebody repeating that reconstruction correctly.</p><div class="contrast-example" aria-label="Comparison between raw regex and structured intent"><div><span>Compressed syntax</span><code>^(\d{3})[-. ]?(\d{3})[-. ]?(\d{4})$</code></div><div><span>Preserved intent</span><code>start + areaCode + separator? + exchange + separator? + lineNumber + end</code></div></div><p>The problem was not regex capability. It was that intent, precedence, composition, and engine-specific behavior were packed into an opaque string.</p></section>

          <section id="strling-evolution" class="case-section"><p class="section-number">02</p><h2>Why the Solution Became a Compiler</h2><p>An initial helper layer can make pattern construction more readable. It cannot, by itself, provide a stable semantic model across runtimes, reason about structure before emission, or separate author intent from target syntax.</p><div class="question-callout"><p>What representation would let developers express pattern intent once, inspect it as structured data, transform it predictably, and emit valid syntax for different regex engines?</p></div><p>That question moved STRling beyond helper functions. A compiler pipeline became the mechanism needed to preserve meaning between a human-facing DSL and multiple target implementations.</p></section>

          <section id="strling-architecture" class="case-section"><p class="section-number">03</p><h2>Compiler Architecture</h2><div class="architecture-stack">
            <article><span>01</span><div><h3>DSL</h3><p>The authoring surface expresses concepts such as literals, groups, choices, boundaries, quantifiers, and reusable components without manually assembling target punctuation.</p></div></article>
            <article><span>02</span><div><h3>Abstract syntax tree</h3><p>The AST records the program's authored structure. Nodes make nesting, composition, and invalid combinations explicit enough to inspect and validate.</p></div></article>
            <article><span>03</span><div><h3>Intermediate representation</h3><p>The IR separates semantic intent from a particular regex flavor. It becomes the stable boundary for normalization, optimization, validation, and emitter behavior.</p></div></article>
            <article><span>04</span><div><h3>Target emission</h3><p>Emitters translate the IR into syntax understood by a target engine. Target-specific choices stay at the edge instead of spreading through user-authored patterns.</p></div></article>
          </div><p>This placement of responsibility matters. The DSL owns author ergonomics, the AST owns source structure, the IR owns target-neutral meaning, and each emitter owns its target's syntax.</p></section>

          <section id="strling-polyglot" class="case-section"><p class="section-number">04</p><h2>Polyglot Consistency</h2><p class="lead">A similar API in several languages is not enough. The important property is semantic agreement.</p><p>STRling's architecture is designed around a shared mental model across bindings and target engines. That requires decisions about node meaning, escaping, precedence, capture behavior, quantifier rules, and unsupported features to remain consistent even when host-language ergonomics differ.</p><div class="polyglot-model" aria-label="One semantic model connects language bindings to target emitters"><div class="model-core"><span>Shared semantic model</span><strong>AST + IR contracts</strong></div><div class="model-ring"><span>Rust</span><span>TypeScript</span><span>Python</span><span>Target engines</span></div></div><p>The governing rule is that host-language convenience cannot silently redefine compiler semantics. Differences must be explicit, testable, and located at a known boundary.</p></section>

          <section id="strling-verification" class="case-section"><p class="section-number">05</p><h2>Testing and Reproducibility</h2><p>The compiler makes several levels of verification possible:</p><ul class="check-list"><li>DSL inputs produce the expected AST structure.</li><li>AST programs compile into the expected target-neutral IR.</li><li>IR fixtures emit the expected syntax for each supported target.</li><li>Emitted patterns demonstrate the intended positive and negative behavior.</li><li>Bindings exercise the same semantic cases rather than merely using similar test names.</li><li>Generated packages are derived from declared source and repeatable build steps.</li></ul><div class="principle-block"><p class="label">Evidence rule</p><p>String equality can verify emitted text. Behavioral fixtures are still needed to verify what that text does, and conformance coverage is needed to show which semantics were exercised across bindings.</p></div></section>

          <section id="strling-distribution" class="case-section"><p class="section-number">06</p><h2>Developer Tooling and Distribution</h2><p>A compiler project is not complete at the compiler boundary. Package layout, host-language APIs, documentation, examples, versioning, release artifacts, and conformance data determine whether the architecture remains usable outside its source tree.</p><p>STRling treats these as part of the same reproducibility problem. A consumer should be able to identify the compiler version, reconstruct how an artifact was produced, and understand which language and target behaviors that artifact supports.</p><div class="distribution-grid"><span>Source specification</span><span>Compiler core</span><span>Language binding</span><span>Package artifact</span><span>Documentation</span><span>Conformance evidence</span></div></section>

          <section id="strling-value" class="case-section"><p class="section-number">07</p><h2>What the Project Demonstrates</h2><p class="lead">STRling demonstrates how Timothy approaches developer tooling: move hidden rules into explicit structure, then make that structure inspectable and testable.</p><p>The project replaces implicit precedence and engine knowledge with typed structure, explicit compilation stages, target-specific emitters, and testable semantic contracts. It also has to prove that its implementations agree, which requires conformance evidence rather than assuming similar APIs behave the same way.</p><p>The <a href="${links.strling}" rel="noopener noreferrer">STRling website</a> contains product documentation and examples, and the <a href="${links.strlingCode}" rel="noopener noreferrer">public repository</a> contains the source.</p><div class="hero-actions">${textLink("Explore STRling", links.strling, { external: true, className: "button button-primary" })}${textLink("Browse the public repository", links.strlingCode, { external: true, className: "button button-secondary" })}</div></section>

          <nav class="case-next" aria-label="Related page"><p class="eyebrow">Related page</p><a href="/approach/"><span>Approach</span><strong>The reasoning pattern behind the work</strong>${icon("arrow")}</a></nav>
        </div>
      </div>
    </article>`;
  return layout({
    title: "STRling Compiler Case Study",
    description,
    pagePath: "/work/strling/",
    body,
    schema,
    pageType: "article",
  });
}

function approachPage() {
  const description =
    "Timothy Macfarlane's engineering approach to defining outcomes, tracing assumptions, encoding rules, verifying results, and building repeatable processes.";
  const schema = graph({
    "@type": "TechArticle",
    "@id": `${siteUrl}/approach/#article`,
    url: `${siteUrl}/approach/`,
    headline: "From Outcome to Reproducible Assurance",
    description,
    author: { "@id": personId },
    about: [
      "software architecture",
      "software assurance",
      "testing architecture",
      "AI-assisted engineering",
      "reproducibility",
    ],
  });
  const body = `
    <section class="page-hero approach-hero" aria-labelledby="approach-title"><div class="shell">${breadcrumb([{ label: "Home", href: "/" }, { label: "Approach" }])}<div class="approach-title-grid"><div><p class="eyebrow">Engineering approach</p><h1 id="approach-title">From outcome to reproducible assurance.</h1></div><p class="page-lede">Timothy starts with the conclusion that actually needs to be true, then works backward through its assumptions and forward into mechanisms that can establish it repeatedly.</p></div><div class="reasoning-map" aria-label="Outcome leads to assumptions, governing rules, mechanisms, evidence, evidence adequacy, and reproducible assurance. Verification can reveal assumptions and return the process upstream."><ol><li><span>01</span>Outcome</li><li><span>02</span>Assumptions</li><li><span>03</span>Governing rules</li><li><span>04</span>Mechanism</li><li><span>05</span>Evidence</li><li><span>06</span>Evidence adequacy</li><li><span>07</span>Reproducible assurance</li></ol><div class="return-loop" aria-hidden="true"><span>new assumption discovered</span></div></div></div></section>

    <section class="section approach-content"><div class="shell approach-grid">
      <aside class="approach-aside"><p class="label">How the loop works</p><p>Verification often exposes another assumption. When it does, the process moves back upstream. The goal is an inspectable chain from the outcome to the evidence that supports it.</p></aside>
      <div class="approach-sections">
        <section><div class="approach-index"><span>01</span><i></i></div><div><p class="eyebrow">Question the formulation</p><h2>The requested task may not represent the decision that matters.</h2><p>“Do the tests pass?” asks about a test runner. “Do we possess sufficient evidence to release this application?” asks about behavior, security, dependencies, infrastructure, authorization, integrations, deployment, and recovery.</p><p>Changing the question changes the work required to answer it. Reframing the problem often reveals requirements the original request never accounted for.</p></div></section>
        <section><div class="approach-index"><span>02</span><i></i></div><div><p class="eyebrow">Expose assumptions</p><h2>Trace conclusions backward through the conditions they require.</h2><p>If a release is called safe because its tests pass, the conclusion assumes that the tests exercise the properties that matter. It also assumes the environment is representative, the data contracts are valid, the artifact is the one being deployed, and failure can be reversed.</p><p>Each condition can contain another assumption. Timothy keeps tracing those dependencies until the important uncertainty is explicit enough to address.</p></div></section>
        <section><div class="approach-index"><span>03</span><i></i></div><div><p class="eyebrow">Define the standard</p><h2>Determine what success means before choosing a measurement.</h2><p>A number is useful only in relation to a defined property. Code coverage does not define behavioral completeness. A latency average does not define an acceptable worst case. A deployment success signal does not define correct authorization.</p><p>The standard names the property, its boundary, acceptable evidence, failure behavior, and any residual decision that remains with a human.</p></div></section>
        <section><div class="approach-index"><span>04</span><i></i></div><div><p class="eyebrow">Make knowledge explicit</p><h2>Put important rules where they can be inspected.</h2><p>Architecture is the placement of knowledge and responsibility. A rule may belong in code, configuration, data, a contract, or an operational process. The choice depends on who owns it, how often it changes, what must enforce it, and which invalid states should be impossible.</p><div class="knowledge-grid"><span><strong>Code</strong> invariant behavior</span><span><strong>Configuration</strong> declared operational choices</span><span><strong>Data</strong> durable facts and constraints</span><span><strong>Contracts</strong> boundary expectations</span><span><strong>Process</strong> consequential human authority</span><span><strong>Observability</strong> behavior known only at runtime</span></div></div></section>
        <section><div class="approach-index"><span>05</span><i></i></div><div><p class="eyebrow">Encode what repeats</p><h2>Preserve recurring decisions in mechanisms.</h2><p>When an important decision will recur, encode as much of that decision as practical into something the system can enforce or verify. That can mean a database constraint, an API contract, a deterministic test profile, a release gate, a policy check, an infrastructure script, or an explicit rollback transition.</p><p>The mechanism is not valuable because it is automated. It is valuable because it preserves a defined decision with less drift and clearer failure.</p></div></section>
        <section><div class="approach-index"><span>06</span><i></i></div><div><p class="eyebrow">Verify the evidence</p><h2>A passing test establishes only what the test evaluates.</h2><p>Every evidence source has a boundary. Unit tests can establish local behavior under supplied inputs. Browser automation can establish selected integrated journeys. Dependency analysis can establish exposure to known advisories. Deployment checks can establish selected properties of a running environment.</p><p>Evidence should not be used to claim properties it did not observe.</p></div></section>
        <section><div class="approach-index"><span>07</span><i></i></div><div><p class="eyebrow">Verify verification</p><h2>Coverage and evidence quality also need verification.</h2><p>A browser suite may pass while omitting a role. Security checks may evaluate direct packages while missing transitive dependencies. Contract tests may validate shape without validating meaning. Deployment verification may call a health endpoint without exercising a critical workflow.</p><div class="verification-layers"><div><span>Layer 1</span><strong>Did the check pass?</strong></div><div><span>Layer 2</span><strong>Did the check cover the required property?</strong></div><div><span>Layer 3</span><strong>Does the combined evidence justify the conclusion?</strong></div></div></div></section>
        <section><div class="approach-index"><span>08</span></div><div><p class="eyebrow">Reproducibility</p><h2>Quality should not depend on remembering the right procedure.</h2><p>A good engineering process becomes durable when another engineer, a CI runner, or a bounded agent can execute it against the same inputs and understand why it passed or failed.</p><p>Reproducibility includes the artifact, environment assumptions, verification profile, acceptance criteria, rejection behavior, and the evidence retained for review.</p></div></section>
      </div>
    </div></section>

    <section class="section ai-section" aria-labelledby="ai-title"><div class="shell ai-grid"><div><p class="eyebrow">AI-assisted engineering</p><h2 id="ai-title">More execution capacity, the same standard of evidence.</h2></div><div><p>Timothy uses AI across research, synthesis, planning, implementation, and analysis. The useful unit is not a single unbounded prompt, but a workflow with supplied context, explicit scope, bounded authority, acceptance criteria, rejection criteria, and independent verification.</p><ul class="ai-controls"><li><span>01</span>Context is supplied, not assumed.</li><li><span>02</span>Authority is limited to the intended decision.</li><li><span>03</span>Outputs face deterministic checks where practical.</li><li><span>04</span>Consequential decisions retain human authority.</li></ul><p class="lead">AI can increase how much work gets done, but the result still has to be checked against evidence.</p></div></div></section>`;
  return layout({
    title: "Engineering Approach",
    description,
    pagePath: "/approach/",
    body,
    schema,
    pageType: "article",
  });
}

function backgroundPage() {
  const description =
    "Timothy Macfarlane's professional background across application engineering, data modernization, software assurance, release engineering, developer tooling, and AI-assisted engineering.";
  const schema = graph({
    "@type": "ProfilePage",
    "@id": `${siteUrl}/background/#page`,
    url: `${siteUrl}/background/`,
    name: "Professional Background | Timothy Macfarlane",
    description,
    mainEntity: { "@id": personId },
  });
  const body = `
    <section class="page-hero background-hero" aria-labelledby="background-title"><div class="shell page-hero-grid"><div>${breadcrumb([{ label: "Home", href: "/" }, { label: "Background" }])}<p class="eyebrow">Professional background</p><h1 id="background-title">Experience built by following problems through the full system.</h1></div><div class="page-intro"><p>Timothy's work crosses application code, databases, browser behavior, infrastructure, deployment, reporting, and operational process because important rules rarely stop at one technical layer.</p><p>That work has led across application engineering, data, testing, infrastructure, delivery, and developer tooling.</p></div></div></section>

    <section class="section current-role" aria-labelledby="current-role-title"><div class="shell role-grid"><div><p class="eyebrow">Current work</p><h2 id="current-role-title">Software architecture and hands-on engineering at Kenneth Froom Tours.</h2></div><div><p>Timothy's current role combines software architecture with hands-on responsibility for production systems, modernization, data and reporting, verification, and operational reliability.</p><p>A single change can span application behavior, data, integrations, and release operations, so those boundaries are treated as one connected system.</p><a class="text-link" href="${links.linkedin}" rel="me noopener noreferrer">Professional history on LinkedIn${icon("external")}</a></div></div></section>

    <section class="section capability-section" aria-labelledby="capabilities-title"><div class="shell"><div class="section-heading split-heading"><div><p class="eyebrow">Applied domains</p><h2 id="capabilities-title">Technical capability in context.</h2></div><p>The work spans applications, data, verification, delivery, developer tooling, and AI-assisted engineering.</p></div><div class="domain-list">
      <article><div class="domain-number">01</div><div><h3>Application Engineering</h3><p>Production web applications, workflow modeling, server-rendered interfaces, API and persistence boundaries, authorization, performance, and maintainability.</p><ul class="tag-list"><li>ASP.NET Core</li><li>MVC</li><li>EF Core</li><li>JavaScript</li><li>TypeScript</li></ul></div><p class="domain-outcome">Uses explicit boundaries so business rules can be understood, enforced, and changed safely.</p></article>
      <article><div class="domain-number">02</div><div><h3>Data and Modernization</h3><p>Migration from legacy Access systems, configuration-driven ETL, schema normalization, referential integrity, reporting, and delivery performance.</p><ul class="tag-list"><li>SQL Server</li><li>Access migration</li><li>ETL</li><li>Normalization</li><li>SSRS</li></ul></div><p class="domain-outcome">Makes migration logic explicit through declared mappings, ordered transformations, validation, and repeatable runs.</p></article>
      <article><div class="domain-number">03</div><div><h3>Testing and Assurance</h3><p>Behavioral verification, browser automation, contract testing, security coverage, dependency analysis, governance checks, and release evidence.</p><ul class="tag-list"><li>Playwright</li><li>Contract tests</li><li>Security verification</li><li>Coverage rules</li><li>Release gates</li></ul></div><p class="domain-outcome">Treats test results as one source of evidence within a broader release-readiness decision.</p></article>
      <article><div class="domain-number">04</div><div><h3>Infrastructure and Delivery</h3><p>Windows application hosting, desired-state automation, CI workflows, artifact handling, health checks, blue-green traffic switching, and rollback.</p><ul class="tag-list"><li>IIS</li><li>Windows</li><li>PowerShell</li><li>GitHub Actions</li><li>Blue-green deployment</li></ul></div><p class="domain-outcome">Turns deployment and recovery standards into repeatable automation instead of remembered procedure.</p></article>
      <article><div class="domain-number">05</div><div><h3>Developer Tooling and Language Work</h3><p>STRling's DSL, structured syntax, intermediate representation, target emission, cross-language semantics, packages, and conformance.</p><ul class="tag-list"><li>DSL design</li><li>AST</li><li>IR</li><li>Code generation</li><li>Compiler architecture</li></ul></div><p class="domain-outcome">Separates author intent from target-specific syntax through explicit compiler stages.</p></article>
      <article><div class="domain-number">06</div><div><h3>AI-Assisted Engineering</h3><p>Bounded agent workflows for research, synthesis, planning, implementation, and analysis with explicit authority and verification.</p><ul class="tag-list"><li>Context design</li><li>Acceptance criteria</li><li>Rejection criteria</li><li>Verification gates</li><li>Human authority</li></ul></div><p class="domain-outcome">Uses AI to increase execution capacity while keeping consequential conclusions tied to independent verification.</p></article>
    </div></div></section>

    <section class="section trajectory-section" aria-labelledby="trajectory-title"><div class="shell trajectory-grid"><div><p class="eyebrow">Trajectory</p><h2 id="trajectory-title">How the engineering scope has expanded.</h2></div><ol class="trajectory-list"><li><span>01</span><div><h3>Applications and data</h3><p>Build features, model workflows, repair data boundaries, and operate software used by the business.</p></div></li><li><span>02</span><div><h3>Architecture and release</h3><p>Place rules deliberately across code, contracts, data, infrastructure, and recovery paths.</p></div></li><li><span>03</span><div><h3>Assurance and governance</h3><p>Define the evidence needed for consequential technical conclusions and encode recurring decisions.</p></div></li><li><span>04</span><div><h3>Languages and advanced tooling</h3><p>Apply the same approach to compilers, language semantics, developer infrastructure, and deeper systems work.</p></div></li></ol></div></section>

    <section class="section public-record"><div class="shell note-grid"><p class="eyebrow">Elsewhere</p><div><h2>More of the work is public elsewhere.</h2><p>GitHub contains Timothy's public code and project history. LinkedIn contains his professional history and technical posts. STRling has its own product and documentation site.</p><div class="inline-links">${textLink("GitHub", links.github, { external: true })}${textLink("LinkedIn", links.linkedin, { external: true })}${textLink("STRling", links.strling, { external: true })}</div></div></div></section>`;
  return layout({
    title: "Professional Background",
    description,
    pagePath: "/background/",
    body,
    schema,
  });
}

function aboutPage() {
  const description =
    "About Timothy Macfarlane, software architect and engineer, including his work, public projects, and interests outside software.";
  const schema = graph({
    "@type": "AboutPage",
    "@id": `${siteUrl}/about/#page`,
    url: `${siteUrl}/about/`,
    name: "About Timothy Macfarlane",
    description,
    mainEntity: { "@id": personId },
  });
  const body = `
    <section class="page-hero about-hero" aria-labelledby="about-title"><div class="shell about-hero-grid"><div>${breadcrumb([{ label: "Home", href: "/" }, { label: "About" }])}<p class="eyebrow">About Timothy</p><h1 id="about-title">Work, interests, and the person behind them.</h1><p class="page-lede">Timothy Macfarlane is a software architect and engineer based in northern Alabama. His work spans production applications, release and verification systems, modernization, and developer tooling.</p></div><figure class="about-portrait"><img src="/assets/images/timothy-macfarlane.png" width="850" height="850" loading="eager" alt="Timothy Macfarlane wearing a dark jacket"><figcaption>Timothy Macfarlane</figcaption></figure></div></section>

    <section class="section about-intro"><div class="shell about-copy-grid"><p class="eyebrow">The person behind the work</p><div><h2>Music, ideas, stories, and interests beyond software.</h2><p>Software takes up a lot of Timothy's attention, especially language design, developer tooling, architecture, and the challenge of making complex systems easier to reason about.</p><p>Outside engineering, he plays piano, listens heavily to electronic music, plays pickleball, and spends time with philosophy, science, rationality, audiobooks, speculative fiction, and anime.</p></div></div></section>

    <section class="section interest-section" aria-labelledby="interests-title"><div class="shell"><div class="section-heading"><p class="eyebrow">Interests</p><h2 id="interests-title">Some recurring interests.</h2></div><ul class="interest-grid"><li><span>01</span><strong>Piano</strong></li><li><span>02</span><strong>Electronic music</strong></li><li><span>03</span><strong>Philosophy</strong></li><li><span>04</span><strong>Science</strong></li><li><span>05</span><strong>Rationality</strong></li><li><span>06</span><strong>Audiobooks</strong></li><li><span>07</span><strong>Speculative fiction</strong></li><li><span>08</span><strong>Anime</strong></li><li><span>09</span><strong>Pickleball</strong></li><li><span>10</span><strong>Programming</strong></li></ul></div></section>

    <section class="section identity-section" aria-labelledby="identity-title"><div class="shell identity-grid"><div><p class="eyebrow">Public identity</p><h2 id="identity-title">Timothy Macfarlane is the name. TheCyberLocal is the handle.</h2></div><div><p>TheCyberLocal is Timothy's long-running GitHub handle and historical web identity. It is where public code and implementation history live. STRling is an independent technical project created by Timothy. This site connects those public projects and profiles back to the person and engineering work behind them.</p></div></div><div class="shell surface-grid"><a href="${links.github}" rel="me noopener noreferrer"><span>Public code and projects</span><strong>GitHub / TheCyberLocal</strong>${icon("external")}</a><a href="${links.linkedin}" rel="me noopener noreferrer"><span>Professional history and posts</span><strong>LinkedIn / Timothy Macfarlane</strong>${icon("external")}</a><a href="${links.strling}" rel="noopener noreferrer"><span>Product and documentation</span><strong>STRling</strong>${icon("external")}</a><a href="${links.email}"><span>Direct contact</span><strong>timdiscovers@gmail.com</strong>${icon("mail")}</a></div></section>`;
  return layout({
    title: "About",
    description,
    pagePath: "/about/",
    body,
    schema,
  });
}

function notFoundPage() {
  const description =
    "The requested page was not found on Timothy Macfarlane's professional site.";
  const body = `<section class="page-hero not-found" aria-labelledby="not-found-title"><div class="shell"><p class="eyebrow">404 / Page not found</p><h1 id="not-found-title">This page could not be found.</h1><p class="page-lede">The page may have moved, or the address may be incomplete.</p><div class="hero-actions">${textLink("Return home", "/", { className: "button button-primary" })}${textLink("Browse selected work", "/work/", { className: "button button-secondary" })}</div></div></section>`;
  return layout({
    title: "Page Not Found",
    description,
    pagePath: "/404.html",
    body,
    schema: graph({
      "@type": "WebPage",
      name: "Page Not Found",
      url: `${siteUrl}/404.html`,
    }),
    noIndex: true,
  });
}

const pages = [
  { file: "index.html", url: "/", render: homePage },
  { file: "work/index.html", url: "/work/", render: workPage },
  {
    file: "work/agent-portal/index.html",
    url: "/work/agent-portal/",
    render: agentPortalPage,
  },
  {
    file: "work/strling/index.html",
    url: "/work/strling/",
    render: strlingPage,
  },
  { file: "approach/index.html", url: "/approach/", render: approachPage },
  {
    file: "background/index.html",
    url: "/background/",
    render: backgroundPage,
  },
  { file: "about/index.html", url: "/about/", render: aboutPage },
  { file: "404.html", url: "/404.html", render: notFoundPage },
];

for (const page of pages) {
  const output = page
    .render()
    .split(String.fromCharCode(10))
    .map((line) => line.trimEnd())
    .join(String.fromCharCode(10));
  if (output.includes("\u2014"))
    throw new Error(`Em dash found in ${page.file}`);
  const outputPath = path.join(root, page.file);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output, "utf8");
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((page) => page.url !== "/404.html")
  .map((page) => `  <url><loc>${siteUrl}${page.url}</loc></url>`)
  .join("\n")}
</urlset>
`;

await writeFile(path.join(root, "sitemap.xml"), sitemap, "utf8");
await writeFile(
  path.join(root, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
  "utf8",
);
await writeFile(path.join(root, ".nojekyll"), "", "utf8");

console.log(`Built ${pages.length} static pages.`);
