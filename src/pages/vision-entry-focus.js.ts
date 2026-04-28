import source from '../scripts/vision-entry-focus.js?raw';
import { javascriptResponse } from '../route-responses';

export function GET() {
  return javascriptResponse(source);
}
