/**
 * Markdown content negotiation (Cloudflare Pages Function).
 *
 * When a request includes `Accept: text/markdown`, serve the pre-generated
 * markdown version of the page (foo.html.md, created by
 * scripts/generate-markdown.py) with Content-Type: text/markdown and an
 * x-markdown-tokens estimate. HTML stays the default for all other requests.
 */
export async function onRequest(context) {
  const { request, env, next } = context;
  const accept = request.headers.get("Accept") || "";

  if (request.method !== "GET" || !accept.includes("text/markdown")) {
    return next();
  }

  const url = new URL(request.url);
  let path = url.pathname;
  if (path.endsWith("/")) path += "index.html";
  if (!path.endsWith(".html")) return next();

  const mdRequest = new Request(new URL(path + ".md", url.origin), {
    headers: request.headers,
  });
  const mdResponse = await env.ASSETS.fetch(mdRequest);
  if (!mdResponse.ok) return next();

  const markdown = await mdResponse.text();
  // Rough token estimate (~4 chars/token); header is optional per spec.
  const tokens = Math.ceil(markdown.length / 4);

  return new Response(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokens),
      "Vary": "Accept",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
