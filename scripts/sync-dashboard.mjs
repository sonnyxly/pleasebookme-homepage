// Copies the dashboard design mockups into public/dashboard, so this site
// serves them at /dashboard and /dashboard/<page>.
//
//   npm run sync:dashboard -- "<path to Platform/sonny-design>"
//
// The mockups are plain HTML, CSS and JS, written with relative paths for
// their own preview server, where every page is a folder beside assets/:
//
//   dashboard/index.html   ->  /dashboard
//   bookings/index.html    ->  /dashboard/bookings
//   assets/...             ->  /dashboard/assets/...
//
// Here they all live under /dashboard, so the paths that cross folders are
// rewritten on the way in. Nothing in public/dashboard is edited by hand:
// change the design files, then run this again. The clean addresses come from
// the rewrites in next.config.ts.
//
// Browsers keep the CSS and JS here for hours, so each page links them with a
// short hash of the file (shell.css?v=1a2b3c4d). A changed file gets a new
// address and is fetched at once; an unchanged one keeps its old address.

import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const HOME = "dashboard"; // the page served at /dashboard itself
const SHARED = "assets";
const TEXT = new Set([".html", ".css", ".js"]);

const source = process.argv[2] ? resolve(process.argv[2]) : "";
if (!source || !existsSync(join(source, HOME, "index.html")) || !existsSync(join(source, SHARED))) {
  console.error('Usage: npm run sync:dashboard -- "<path to Platform/sonny-design>"');
  console.error(`Expected ${HOME}/index.html and ${SHARED}/ inside that folder.`);
  process.exit(1);
}

const target = resolve(dirname(fileURLToPath(import.meta.url)), "..", "public", "dashboard");

// Every folder with an index.html is a page.
const pages = readdirSync(source, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== SHARED && existsSync(join(source, entry.name, "index.html")))
  .map((entry) => entry.name);

const route = (page) => (page === HOME ? "/dashboard" : `/dashboard/${page}`);

function rewrite(text, page, ext) {
  // ../assets/shell.css  ->  /dashboard/assets/shell.css
  let out = text.replaceAll(`../${SHARED}/`, `/dashboard/${SHARED}/`);
  // ../bookings/  ->  /dashboard/bookings   (a link to another page)
  for (const other of pages) out = out.replaceAll(`../${other}/`, route(other));
  // href="dashboard.css"  ->  href="/dashboard/dashboard.css"   (a page's own files)
  if (ext === ".html" && page) {
    out = out.replace(/\b(href|src)="(?![a-z]+:|\/|#|\.\.)([^"]+)"/g, (_, attr, file) => `${attr}="${route(page)}/${file}"`);
  }
  return out;
}

function filesIn(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

const before = new Set(filesIn(target));
const written = new Set();
const leftovers = [];

function copyFolder(folder, into, page) {
  for (const from of filesIn(join(source, folder))) {
    const to = join(into, relative(join(source, folder), from));
    const ext = extname(from).toLowerCase();
    mkdirSync(dirname(to), { recursive: true });
    if (TEXT.has(ext)) {
      const text = rewrite(readFileSync(from, "utf8"), page, ext);
      // A relative path that still climbs out of its folder would break here.
      if (text.includes("../")) leftovers.push(relative(source, from));
      writeFileSync(to, text);
    } else {
      copyFileSync(from, to);
    }
    written.add(to);
  }
}

copyFolder(SHARED, join(target, SHARED), null);
for (const page of pages) copyFolder(page, page === HOME ? target : join(target, page), page);

// /dashboard/assets/shell.css  ->  /dashboard/assets/shell.css?v=1a2b3c4d
const hashes = new Map();
function versioned(url) {
  const file = join(target, url.slice("/dashboard/".length));
  if (!written.has(file)) return url;
  if (!hashes.has(file)) hashes.set(file, createHash("sha256").update(readFileSync(file)).digest("hex").slice(0, 8));
  return `${url}?v=${hashes.get(file)}`;
}
for (const file of written) {
  if (extname(file) !== ".html") continue;
  const html = readFileSync(file, "utf8");
  writeFileSync(file, html.replace(/\b(href|src)="(\/dashboard\/[^"?#]+\.(?:css|js))"/g, (_, attr, url) => `${attr}="${versioned(url)}"`));
}

const show = (path) => relative(target, path).split(sep).join("/");
console.log(`Copied ${written.size} files to public/dashboard`);
for (const page of pages) console.log(`  ${route(page)}`);

// Files from an earlier run that the design no longer has are left alone and listed.
const stale = [...before].filter((path) => !written.has(path));
if (stale.length) {
  console.warn(`\n${stale.length} file(s) in public/dashboard are no longer in the design:`);
  stale.forEach((path) => console.warn(`  ${show(path)}`));
}

if (leftovers.length) {
  console.error('\nThese files still contain a "../" path this script does not know how to rewrite:');
  leftovers.forEach((path) => console.error(`  ${path}`));
  process.exit(1);
}
