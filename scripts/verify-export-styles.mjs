import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Check the styles linked by the exported page, not the dev server's CSS cache.
// A successful Next build alone does not prove custom Tailwind utilities survived.
const exportDirectory = resolve('dist');
const html = await readFile(resolve(exportDirectory, 'index.html'), 'utf8');
const stylesheets = [...html.matchAll(/<link\b[^>]*>/g)]
  .map(([tag]) => /\brel="stylesheet"/.test(tag) && tag.match(/\bhref="([^"]+)"/)?.[1])
  .filter(Boolean)
  .filter(href => href.startsWith('/_next/'));

if (!stylesheets.length) throw new Error('No local stylesheets found in the static export.');

const css = (await Promise.all(stylesheets.map(href =>
  readFile(resolve(exportDirectory, `.${href.split('?')[0]}`), 'utf8'),
))).join('\n');

const requiredUtilities = [
  'font-body', 'font-display', 'bg-page', 'bg-butter',
  'bg-cream', 'bg-panel', 'text-ink', 'text-sky', 'text-action',
];
const missing = requiredUtilities.filter(name => !new RegExp(`\\.${name}\\s*\\{`).test(css));
for (const name of ['blob0', 'blob1', 'blob2', 'blob3', 'float0', 'float1', 'float2', 'blobMove', 'scrollBounce']) {
  if (!new RegExp(`@keyframes\\s+${name}\\s*\\{`).test(css)) missing.push(`animation:${name}`);
}

if (missing.length) {
  throw new Error(`Static export is missing portfolio styles: ${missing.join(', ')}. Do not deploy this output.`);
}
console.log(`Static export styles verified (${requiredUtilities.length} theme utilities and 9 animations).`);
