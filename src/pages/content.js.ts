import { hazakuraContent } from '../data/content.js';

export function GET() {
  return new Response(`window.HAZAKURA_CONTENT = ${JSON.stringify(hazakuraContent, null, 2)};\n`, {
    headers: {
      'Content-Type': 'text/javascript; charset=utf-8'
    }
  });
}
