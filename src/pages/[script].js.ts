import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { scriptLoadOrder } from '../data/script-load-order.js';
import { javascriptResponse } from '../route-responses';

const manifestScriptPaths = scriptLoadOrder.filter((path) => path !== '/content.js');
const manifestScriptNames = new Set(
  manifestScriptPaths.map((path) => path.slice(1, -3))
);

export function getStaticPaths() {
  return manifestScriptPaths.map((path) => ({
    params: { script: path.slice(1, -3) }
  }));
}

export function GET({ params }: { params: { script: string } }) {
  if (!manifestScriptNames.has(params.script)) {
    return new Response('Not found', { status: 404 });
  }

  const sourcePath = join(process.cwd(), 'src', 'scripts', `${params.script}.js`);
  return javascriptResponse(readFileSync(sourcePath, 'utf8'));
}
