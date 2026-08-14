import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requiredPages = [
  "index.html",
  "work/index.html",
  "work/agent-portal/index.html",
  "work/strling/index.html",
  "approach/index.html",
  "background/index.html",
  "about/index.html",
];
const forbiddenPhrases = [
  "systems thinker",
  "passionate technologist",
  "quick learner",
  "open to work",
  "hire me",
  "looking for opportunities",
  "next challenge",
  "passionate",
  "visionary",
  "innovative",
  "life larger than a codebase",
  "canonical surfaces",
  "interpretation layer",
  "public surfaces",
];
const expectedExternalLinks = [
  "https://github.com/TheCyberLocal",
  "https://www.linkedin.com/in/tzm01",
  "https://strling-lang.netlify.app/",
  "mailto:timdiscovers@gmail.com",
];
const buttonPages = new Map([
  ["index.html", ["View selected work", "Read the approach"]],
  ["work/index.html", ["Read the case study", "Read the case study"]],
  ["work/strling/index.html", ["Visit the STRling website", "View source", "Explore STRling", "Browse the public repository"]],
  ["404.html", ["Return home", "Browse selected work"]],
]);

const errors = [];
const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();

function fail(message) {
  errors.push(message);
}

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

function getFirst(html, pattern) {
  return pattern.exec(html)?.[1]?.trim() ?? "";
}

function targetForUrl(urlPath) {
  const clean = urlPath.split(/[?#]/)[0];
  const decoded = decodeURIComponent(clean);
  if (decoded === "/") return path.join(root, "index.html");
  const relative = decoded.replace(/^\//, "");
  if (decoded.endsWith("/")) return path.join(root, relative, "index.html");
  return path.join(root, relative);
}

for (const relative of requiredPages) {
  const file = path.join(root, relative);
  if (!(await exists(file))) {
    fail(`Missing required page: ${relative}`);
    continue;
  }

  const html = await readFile(file, "utf8");
  if (!html.startsWith("<!doctype html>")) fail(`${relative}: missing HTML doctype`);
  if (!html.includes('<html lang="en">')) fail(`${relative}: missing document language`);
  if (!html.includes('name="viewport"')) fail(`${relative}: missing viewport metadata`);
  if (!html.includes('id="main-content"')) fail(`${relative}: missing main landmark target`);
  if (!html.includes('class="skip-link"')) fail(`${relative}: missing skip link`);
  if (!html.includes('aria-controls="primary-navigation"')) fail(`${relative}: mobile navigation control is incomplete`);

  const title = getFirst(html, /<title>([^<]+)<\/title>/i);
  const description = getFirst(html, /<meta name="description" content="([^"]+)">/i);
  const canonical = getFirst(html, /<link rel="canonical" href="([^"]+)">/i);
  const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
  if (!title) fail(`${relative}: missing title`);
  if (!description) fail(`${relative}: missing meta description`);
  if (!canonical) fail(`${relative}: missing canonical URL`);
  if (h1Count !== 1) fail(`${relative}: expected one h1, found ${h1Count}`);
  if (titles.has(title)) fail(`${relative}: duplicate title also used by ${titles.get(title)}`);
  else titles.set(title, relative);
  if (descriptions.has(description)) fail(`${relative}: duplicate description also used by ${descriptions.get(description)}`);
  else descriptions.set(description, relative);
  if (canonicals.has(canonical)) fail(`${relative}: duplicate canonical also used by ${canonicals.get(canonical)}`);
  else canonicals.set(canonical, relative);

  for (const requiredMeta of ["og:title", "og:description", "og:url", "og:image", "twitter:card", "twitter:title", "twitter:description"]) {
    if (!html.includes(`content=`) || !html.includes(requiredMeta)) fail(`${relative}: missing social metadata ${requiredMeta}`);
  }

  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (jsonLdBlocks.length === 0) fail(`${relative}: missing JSON-LD`);
  for (const block of jsonLdBlocks) {
    try {
      const data = JSON.parse(block[1]);
      if (data["@context"] !== "https://schema.org") fail(`${relative}: JSON-LD context is not Schema.org`);
      if (!JSON.stringify(data).includes("Timothy Macfarlane")) fail(`${relative}: JSON-LD does not identify Timothy Macfarlane`);
    } catch (error) {
      fail(`${relative}: invalid JSON-LD (${error.message})`);
    }
  }

  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  for (const image of images) {
    if (!/\balt="[^"]+"/i.test(image)) fail(`${relative}: image is missing meaningful alt text`);
  }

  const urls = [
    ...[...html.matchAll(/\bhref="([^"]+)"/gi)].map((match) => match[1]),
    ...[...html.matchAll(/\bsrc="([^"]+)"/gi)].map((match) => match[1]),
  ];

  for (const url of urls) {
    if (!url.startsWith("/")) continue;
    const target = targetForUrl(url);
    if (!(await exists(target))) {
      fail(`${relative}: broken internal reference ${url}`);
      continue;
    }
    const hash = url.includes("#") ? url.split("#")[1] : "";
    if (hash && target.endsWith(".html")) {
      const targetHtml = await readFile(target, "utf8");
      if (!targetHtml.includes(`id="${hash}"`)) fail(`${relative}: missing anchor target ${url}`);
    }
  }

  for (const phrase of forbiddenPhrases) {
    if (html.toLowerCase().includes(phrase)) fail(`${relative}: forbidden phrase found: ${phrase}`);
  }
}

const allHtml = (await Promise.all(requiredPages.map((file) => readFile(path.join(root, file), "utf8")))).join("\n");
for (const expected of expectedExternalLinks) {
  if (!allHtml.includes(expected)) fail(`Required public surface is not linked: ${expected}`);
}

for (const [relative, expectedLabels] of buttonPages) {
  const html = await readFile(path.join(root, relative), "utf8");
  const buttons = [...html.matchAll(/<a\b([^>]*\bclass="[^"]*\bbutton\b[^"]*"[^>]*)>([\s\S]*?)<\/a>/gi)];
  const labels = buttons.map((button) => button[2].replace(/<svg[\s\S]*?<\/svg>/gi, "").replace(/<[^>]+>/g, "").trim());

  if (buttons.length !== expectedLabels.length) {
    fail(`${relative}: expected ${expectedLabels.length} CTA buttons, found ${buttons.length}`);
  }
  if (JSON.stringify(labels) !== JSON.stringify(expectedLabels)) {
    fail(`${relative}: CTA button labels or order changed`);
  }

  for (const button of buttons) {
    if (!/\bbutton-(?:primary|secondary)\b/.test(button[1])) fail(`${relative}: button is missing its visual variant`);
    if (!/<svg\b[^>]*\bclass="[^"]*\bicon\b[^"]*"/i.test(button[2])) fail(`${relative}: button icon is missing from the button element`);
  }
}

const siteCss = await readFile(path.join(root, "assets/css/site.css"), "utf8");
const buttonRule = getFirst(siteCss, /(?:^|\n)\.button\s*\{([^}]*)\}/i);
const buttonIconRule = getFirst(siteCss, /(?:^|\n)\.button\s+\.icon\s*\{([^}]*)\}/i);
const textLinkRule = getFirst(siteCss, /(?:^|\n)\.text-link\s*\{([^}]*)\}/i);

for (const declaration of ["display: inline-flex", "align-items: center", "justify-content: center", "gap:", "width: fit-content"]) {
  if (!buttonRule.includes(declaration)) fail(`Shared .button rule is missing ${declaration}`);
}
if (!buttonIconRule.includes("flex: none")) fail("Shared .button icon can shrink or escape its CTA layout");
if (!textLinkRule.includes("display: inline-flex")) fail("Shared .text-link layout contract changed");

const siteJs = await readFile(path.join(root, "assets/js/site.js"), "utf8");
if (Buffer.byteLength(siteJs, "utf8") > 4096) fail("Runtime JavaScript exceeds the 4 KB maintenance budget");

const robots = await readFile(path.join(root, "robots.txt"), "utf8");
if (!robots.includes("Allow: /") || !robots.includes("https://thecyberlocal.github.io/sitemap.xml")) fail("robots.txt is incomplete");

const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
for (const relative of requiredPages) {
  const urlPath = relative === "index.html" ? "/" : `/${relative.replace(/index\.html$/, "")}`;
  if (!sitemap.includes(`<loc>https://thecyberlocal.github.io${urlPath}</loc>`)) fail(`sitemap.xml is missing ${urlPath}`);
}

async function textFiles(directory) {
  const results = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) results.push(...(await textFiles(full)));
    else if (/\.(?:html|css|js|mjs|json|md|txt|xml|svg)$/i.test(entry.name) || entry.name === ".nojekyll") results.push(full);
  }
  return results;
}

for (const file of await textFiles(root)) {
  const content = await readFile(file, "utf8");
  if (content.includes("\u2014")) fail(`${path.relative(root, file)}: em dash found`);
}

if (errors.length > 0) {
  console.error(`Verification failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Verified ${requiredPages.length} pages, internal references, metadata, structured data, public links, and copy constraints.`);
