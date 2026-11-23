import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const outputDirectory = resolve(fileURLToPath(new URL("../out/", import.meta.url)));
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function resolveRequestPath(requestUrl) {
  const url = new URL(requestUrl ?? "/", "http://localhost");
  let pathname;

  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    return null;
  }

  if (pathname.includes("\0")) {
    return null;
  }

  const relativePath = pathname.endsWith("/")
    ? `${pathname}index.html`
    : extname(pathname)
      ? pathname
      : `${pathname}/index.html`;
  const filePath = resolve(outputDirectory, `.${relativePath}`);

  if (filePath !== outputDirectory && !filePath.startsWith(`${outputDirectory}${sep}`)) {
    return null;
  }

  return filePath;
}

const server = createServer((request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method not allowed");
    return;
  }

  const filePath = resolveRequestPath(request.url);
  if (!filePath) {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Bad request");
    return;
  }

  try {
    const stats = statSync(filePath);
    if (!stats.isFile()) {
      throw new Error("Not a file");
    }

    response.writeHead(200, {
      "Content-Length": stats.size,
      "Content-Type": contentTypes[extname(filePath)] ?? "application/octet-stream",
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
server.listen(port, "0.0.0.0", () => {
  console.log(`Serving static export on http://localhost:${port}`);
});
