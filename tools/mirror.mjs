import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['fe','oto1','oto2','oto3','oto4','oto5','oto6','oto7','pp','terms','refund','compliance','earnings'];

function funnelScript(product) {
  return `<script>window.QL_PRODUCT=${JSON.stringify(product)};</script><script src="/assets/funnel.js" defer></script><script src="/assets/tracker.js" defer></script>`;
}

for (const route of pages) {
  const response = await fetch(`https://getqlabs.com/${route}`);
  if (!response.ok) throw new Error(`${route}: ${response.status}`);
  let html = await response.text();
  const product = route === 'fe' ? 'front' : route;
  html = html
    .replaceAll('https://getqlabs.com/', '/')
    .replaceAll('https:\\u002F\\u002Fgetqlabs.com\\u002F', '\\u002F')
    .replaceAll('https://getrobinhod.com/', '/')
    .replaceAll('https:\\u002F\\u002Fgetrobinhod.com\\u002F', '\\u002F')
    .replace(/https:\/\/www\.jvzoo\.com\/b\/[^"'\\<\s?]+\?coupon=[^"'\\<\s]+/gi, `/buy/${product}_downsell`)
    .replace(/https:\/\/www\.jvzoo\.com\/b\/[^"'\\<\s]+/gi, `/buy/${product}`)
    .replace(/<\/body>/i, `${funnelScript(product)}</body>`);
  const target = route === 'fe' ? join(root, 'fe', 'index.html') : join(root, route, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}

await copyFile(join(root, 'fe', 'index.html'), join(root, 'index.html'));
console.log(`Mirrored ${pages.length} Get Q Labs pages.`);
