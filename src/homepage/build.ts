// Builds the cat homepage into dist/
// It works. Nobody said it was good.

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { cats, type Cat } from "./cats.ts";

const out = "dist";
const colors = ["#f4a261", "#2a9d8f", "#e76f51", "#457b9d", "#e9c46a", "#8d99ae"];

// every cat gets its own picture file
function picture(color: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <polygon points="10,26 16,4 30,18" fill="${color}"/>
  <polygon points="54,26 48,4 34,18" fill="${color}"/>
  <circle cx="32" cy="36" r="24" fill="${color}"/>
  <circle cx="23" cy="32" r="4" fill="#222"/>
  <circle cx="41" cy="32" r="4" fill="#222"/>
  <polygon points="29,40 35,40 32,44" fill="#222"/>
  <path d="M32 44 Q28 50 24 46 M32 44 Q36 50 40 46" stroke="#222" stroke-width="2" fill="none"/>
</svg>
`;
}

// and its own stylesheet
function styles(): string {
  const cardColors = colors.map((color: string, index: number) => `
  .color-${index} h3 { color: ${color}; }
  .color-${index} { border-color: ${color}; }`).join("");

  return `
  body { font-family: sans-serif; margin: 24px; }
  .card { border: 2px solid; border-radius: 8px; padding: 8px; margin: 8px; width: 260px; float: left; height: 150px; }
  nav { clear: both; padding-top: 16px; }
  nav a { margin-right: 8px; }
  ${cardColors}`;
}

function card(cat: Cat): string {
  return `
    <article class="card color-${cat.id % colors.length}">
        <img src="img/cat-${cat.id % colors.length}.svg" alt="${cat.name}" width="64" height="64">
        <h3>${cat.name}</h3>
        <p>${cat.quirk}</p>
        <p>naps: <b>${cat.naps}</b> hours a day</p>
    </article>`;
}

rmSync(out, { recursive: true, force: true });
mkdirSync(`${out}/img`, { recursive: true });
mkdirSync(`${out}/css`, { recursive: true });

writeFileSync(`${out}/css/style.css`, styles());
colors.forEach((cat: string, index: number) => {
  writeFileSync(`${out}/img/cat-${index}.svg`, picture(cat));
});

// const html = `<!doctype html>
// <html lang="en">
// <head>
//   <meta charset="utf-8">
//   <title>The cats</title>
//     <link rel="stylesheet" href="css/style.css">
// </head>
// <body>
//   <h1>The cats</h1>
//   ${cats.map(card).join("")}
// </body>
// </html>
// `;
// writeFileSync(`${out}/index.html`, html);
// console.log(`${cats.length} cats in ${out}/`);

const pageSize = 24;
const totalPages = Math.ceil(cats.length / pageSize);

function pageFile(page: number): string {
  return page === 1 ? "index.html" : `page-${page}.html`;
}

function pagination(current: number): string {
  const links = Array.from({ length: totalPages }, (_, i) => {
    const p = i + 1;
    return p === current ? `<b>${p}</b>` : `<a href="${pageFile(p)}">${p}</a>`;
  }).join(" ");
  return `<nav>Page: ${links}</nav>`;
}

for (let page = 1; page <= totalPages; page++) {
  const slice = cats.slice((page - 1) * pageSize, page * pageSize);
  const html = `<!doctype html>
                    <html lang="en">
                        <head>
                            <meta charset="utf-8">
                            <title>The cats (page ${page})</title>
                            <link rel="stylesheet" href="css/style.css">
                        </head>
                        <body>
                            <h1>The cats</h1>
                            ${slice.map(card).join("")}
                            ${pagination(page)}
                        </body>
                    </html>`;
  writeFileSync(`${out}/${pageFile(page)}`, html);
}
console.log(`${cats.length} cats across ${totalPages} pages in ${out}/`);
