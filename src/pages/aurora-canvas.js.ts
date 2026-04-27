import source from '../scripts/aurora-canvas.js?raw';

export function GET() {
  return new Response(source, {
    headers: {
      'Content-Type': 'text/javascript; charset=utf-8'
    }
  });
}
