import source from '../styles/site.css?raw';
import { stylesheetResponse } from '../route-responses';

export function GET() {
  return stylesheetResponse(source);
}
