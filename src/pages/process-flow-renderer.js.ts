import source from '../scripts/process-flow-renderer.js?raw';
import { javascriptResponse } from '../route-responses';

export function GET() {
  return javascriptResponse(source);
}
