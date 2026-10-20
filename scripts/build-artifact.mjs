// Builds one self-contained HTML of the site (JS, CSS and images inlined) for the
// «GEOKURS Online Preview» artifact — same approach as the 919 and ORDA previews.
// Run: npm run build:artifact  → preview/geokurs-preview.html
import { execSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

const out = 'dist-artifact';
execSync(`npx vite build --outDir ${out} --emptyOutDir`, { stdio: 'inherit', env: { ...process.env, BASE: './', VITE_ARTIFACT: '1' } });

const assets = join(out, 'assets');
const read = (ext) => readdirSync(assets).filter((f) => f.endsWith(ext)).map((f) => readFileSync(join(assets, f), 'utf8')).join('\n');
// A literal </script> or </style> inside the bundle would end the inline block early.
const js = read('.js').replace(/<\/script/gi, '<\\/script');
const css = read('.css').replace(/<\/style/gi, '<\\/style');

const mime = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg' };
const imgDir = 'public/images';
const images = Object.fromEntries(
  readdirSync(imgDir)
    .filter((f) => mime[extname(f)] && f !== 'favicon.png')
    .map((f) => [f, `data:${mime[extname(f)]};base64,${readFileSync(join(imgDir, f)).toString('base64')}`]),
);

// The artifact host wraps the page in its own doctype/head/body skeleton, so the file starts at <title>.
const html = `<title>GEOKURS Online Preview</title>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Golos+Text:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${css}
html,body{background:#F4F6F2;color:#0B0F0C}</style>
<div id="root"></div>
<script>window.__GK_IMAGES=${JSON.stringify(images)};</script>
<script type="module">${js}</script>
`;

mkdirSync('preview', { recursive: true });
writeFileSync('preview/geokurs-preview.html', html);
console.log(`preview/geokurs-preview.html — ${Object.keys(images).length} images inlined, ${(html.length / 1e6).toFixed(1)} MB`);
