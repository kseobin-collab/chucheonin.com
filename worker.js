const CANONICAL_HOST = "chucheonin.com";
const ALIAS_HOST = "www.chucheonin.com";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isSiteHost = url.hostname === CANONICAL_HOST || url.hostname === ALIAS_HOST;
    const hasIndexDocument = url.pathname === "/index.html" || url.pathname.endsWith("/index.html");
    const needsCanonicalRedirect =
      isSiteHost &&
      (url.protocol !== "https:" || url.hostname !== CANONICAL_HOST || hasIndexDocument);

    if (needsCanonicalRedirect) {
      url.protocol = "https:";
      url.hostname = CANONICAL_HOST;
      url.port = "";
      if (hasIndexDocument) {
        url.pathname = url.pathname.slice(0, -"index.html".length) || "/";
      }
      return Response.redirect(url.toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 || !url.pathname.endsWith("/")) {
      return response;
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = `${url.pathname}index.html`;
    return env.ASSETS.fetch(new Request(indexUrl.toString(), request));
  },
};
