import source from '../styles/site.css?raw';

export function GET() {
  return new Response(source, {
    headers: { 'Content-Type': 'text/css; charset=utf-8' }
  });
}
