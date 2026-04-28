import { hazakuraContent } from '../data/content.js';
import { javascriptResponse } from '../route-responses';

export function GET() {
  return javascriptResponse(`window.HAZAKURA_CONTENT = ${JSON.stringify(hazakuraContent, null, 2)};\n`);
}
