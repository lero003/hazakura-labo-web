import source from '../scripts/smooth-scroll.js?raw';
import { javascriptResponse } from '../route-responses';

export function GET() {
  return javascriptResponse(source);
}
