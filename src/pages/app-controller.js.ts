import source from '../scripts/app-controller.js?raw';
import { javascriptResponse } from '../route-responses';

export function GET() {
  return javascriptResponse(source);
}
