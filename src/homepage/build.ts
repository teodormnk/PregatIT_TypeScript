// Builds the cat homepage into dist/
// It works. Nobody said it was good.

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { cats, type Cat } from "./cats.ts";

const out = "dist";
const colors = ["#f4a261", "#2a9d8f", "#e76f51", "#457b9d", "#e9c46a", "#8d99ae"];

function color(cat: Cat): string {
  return colors[cat.id % colors.length];
}

// every cat gets its own picture file
function picture(cat: Cat): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- picture of ${cat.name}, generated ${new Date().toISOString()} -->
  <polygon points="10,26 16,4 30,18" fill="${color(cat)}"/>
  <polygon points="54,26 48,4 34,18" fill="${color(cat)}"/>
  <circle cx="32" cy="36" r="24" fill="${color(cat)}"/>
  <circle cx="23" cy="32" r="4" fill="#222"/>
  <circle cx="41" cy="32" r="4" fill="#222"/>
  <polygon points="29,40 35,40 32,44" fill="#222"/>
  <path d="M32 44 Q28 50 24 46 M32 44 Q36 50 40 46" stroke="#222" stroke-width="2" fill="none"/>
</svg>
`;
}

// and its own stylesheet
function style(cat: Cat): string {
  return `/* styles for ${cat.name} */
.cat-${cat.id} .cat-card-header-title-text { color: ${color(cat)}; }
.cat-${cat.id} .cat-card-inner { border-color: ${color(cat)}; }
.cat-${cat.id} .cat-card-body-naps-value { font-weight: bold; }
`;
}

function card(cat: Cat): string {
  return `
    <div class="cat-wrapper cat-${cat.id}">
      <div class="cat-card">
        <div class="cat-card-inner" style="border: 2px solid; border-radius: 8px; padding: 8px; margin: 8px; width: 260px; float: left; height: 150px;">
          <div class="cat-card-header">
            <div class="cat-card-header-picture">
              <img src="img/cat-${cat.id}.svg" alt="${cat.name}" width="64" height="64">
            </div>
            <div class="cat-card-header-title">
              <h3 class="cat-card-header-title-text"><span>${cat.name}</span></h3>
            </div>
          </div>
          <div class="cat-card-body">
            <div class="cat-card-body-quirk"><p><span>${cat.quirk}</span></p></div>
            <div class="cat-card-body-naps"><p><span>naps: </span><span class="cat-card-body-naps-value">${cat.naps}</span><span> hours a day</span></p></div>
          </div>
        </div>
      </div>
    </div>`;
}

rmSync(out, { recursive: true, force: true });
mkdirSync(`${out}/img`, { recursive: true });
mkdirSync(`${out}/css`, { recursive: true });

for (const cat of cats) {
  writeFileSync(`${out}/img/cat-${cat.id}.svg`, picture(cat));
  writeFileSync(`${out}/css/cat-${cat.id}.css`, style(cat));
}

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>The cats</title>
  <style>body { font-family: sans-serif; margin: 24px; }</style>
${cats.map((cat) => `  <link rel="stylesheet" href="css/cat-${cat.id}.css">`).join("\n")}
</head>
<body>
  <div class="page">
    <div class="page-header"><h1>The cats</h1></div>
    <div class="page-content">${cats.map(card).join("")}
    </div>
  </div>
</body>
</html>
`;

writeFileSync(`${out}/index.html`, html);
console.log(`${cats.length} cats in ${out}/`);
