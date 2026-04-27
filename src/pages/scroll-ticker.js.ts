import source from '../scripts/scroll-ticker.js?raw';

export function GET() {
  return new Response(source, {
    headers: {
      'Content-Type': 'text/javascript; charset=utf-8'
    }
  });
}
