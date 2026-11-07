import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['fe','oto1','oto2','oto3','oto4','oto5','oto6','oto7','pp','terms','refund','compliance','earnings'];
const jvzooProducts = { oto1:'442445', oto2:'442447', oto3:'442451', oto4:'452707', oto5:'452709', oto6:'452711', oto7:'452713' };
const discounts = { oto1:'GET100OFF', oto2:'GET50OFF', oto3:'GET30OFF', oto4:'GET30OFF', oto5:'GET100OFF', oto6:'GET50OFF', oto7:'GET100OFF' };

function funnelScript(product) {
  return `<script>window.QL_PRODUCT=${JSON.stringify(product)};</script><script src="/assets/funnel.js" defer></script><script src="/assets/tracker.js" defer></script>`;
}

for (const route of pages) {
  const response = await fetch(`https://getqlabs.com/${route}`);
  if (!response.ok) throw new Error(`${route}: ${response.status}`);
  let html = await response.text();
  const product = route === 'fe' ? 'front' : route;
  if (jvzooProducts[route]) {
    const base = `https:\\u002F\\u002Fwww.jvzoo.com\\u002Fb\\u002F116973\\u002F${jvzooProducts[route]}\\u002F99`;
    html = html.replaceAll(`${base}?coupon=${discounts[route]}`, `/buy/${product}_downsell`).replaceAll(base, `/buy/${product}`);
  }
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
