import { join, normalize } from "node:path";

const DEFAULT_PORT = 3000;
const requestedPort = Number.parseInt(Bun.env.PORT ?? "", 10);
const port = Number.isFinite(requestedPort) && requestedPort > 0 ? requestedPort : DEFAULT_PORT;
const publicDir = join(import.meta.dir, "public");

const mimeTypes: Record<string, string> = {
  css: "text/css; charset=utf-8",
  html: "text/html; charset=utf-8",
  js: "application/javascript; charset=utf-8",
  json: "application/json; charset=utf-8",
  png: "image/png",
  svg: "image/svg+xml",
  txt: "text/plain; charset=utf-8",
  webp: "image/webp"
};

function getFilePath(pathname: string): string | null {
  const decodedPath = decodeURIComponent(pathname);
  const routePath = decodedPath === "/" ? "/index.html" : decodedPath;

  if (routePath.includes("\0")) {
    return null;
  }

  const normalized = normalize(routePath).replace(/^[/\\]+/, "");

  if (
    normalized.startsWith("..") ||
    normalized.includes("../") ||
    normalized.includes("..\\")
  ) {
    return null;
  }

  return join(publicDir, normalized);
}

function getMimeType(filePath: string): string {
  const extension = filePath.split(".").pop()?.toLowerCase() ?? "";
  return mimeTypes[extension] ?? "application/octet-stream";
}

Bun.serve({
  port,
  async fetch(request: Request): Promise<Response> {
    const { pathname } = new URL(request.url);
    const filePath = getFilePath(pathname);

    if (!filePath) {
      return new Response("Invalid request path", { status: 400 });
    }

    const file = Bun.file(filePath);
    const exists = await file.exists();

    if (!exists) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(file, {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": getMimeType(filePath)
      }
    });
  }
});

console.log(`Cute SVGs server running on http://localhost:${port}`);
