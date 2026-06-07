/**
 * Markdown content negotiation — standalone Cloudflare Worker.
 *
 * Use this because dashboard drag-and-drop uploads do NOT deploy Pages
 * Functions. This Worker does the same job from a zone route instead.
 *
 * Setup (one time, in the Cloudflare dashboard):
 *   1. Workers & Pages > Create > Worker. Name it e.g. "markdown-negotiation".
 *   2. Paste this entire file into the editor, then Deploy.
 *   3. On the drneilpatelmd.com zone: Workers Routes > Add route:
 *        Route:  www.drneilpatelmd.com/*
 *        Worker: markdown-negotiation
 *
 * Behavior: GET requests with `Accept: text/markdown` for an HTML page are
 * answered with the pre-generated .md file (uploaded as part of the site by
 * scripts/generate-markdown.py). Everything else passes through untouched.
 * Same-zone subrequests skip Worker routes, so there is no loop.
 */
export default {
  async fetch(request) {
    const accept = request.headers.get("Accept") || "";
    if (request.method === "GET" && accept.includes("text/markdown")) {
      const url = new URL(request.url);
      let path = url.pathname;
      if (path.endsWith("/")) path += "index.html";
      if (path.endsWith(".html")) {
        const mdResponse = await fetch(new URL(path + ".md", url.origin));
        if (mdResponse.ok) {
          const markdown = await mdResponse.text();
          return new Response(markdown, {
            status: 200,
            headers: {
              "Content-Type": "text/markdown; charset=utf-8",
              "x-markdown-tokens": String(Math.ceil(markdown.length / 4)),
              "Vary": "Accept",
              "Cache-Control": "public, max-age=3600",
            },
          });
        }
      }
    }
    return fetch(request);
  },
};
