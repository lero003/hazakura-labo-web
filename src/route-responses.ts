const textResponse = (body: string, contentType: string) =>
  new Response(body, {
    headers: { 'Content-Type': contentType }
  });

export const javascriptResponse = (source: string) =>
  textResponse(source, 'text/javascript; charset=utf-8');

export const stylesheetResponse = (source: string) =>
  textResponse(source, 'text/css; charset=utf-8');
