import source from '../scripts/project-renderer.js?raw';

export function GET() {
  return new Response(source, {
    headers: {
      'Content-Type': 'text/javascript; charset=utf-8'
    }
  });
}
