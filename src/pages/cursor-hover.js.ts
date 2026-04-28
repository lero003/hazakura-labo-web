import source from '../scripts/cursor-hover.js?raw';
import { javascriptResponse } from '../route-responses';

export function GET() {
  return javascriptResponse(source);
}
