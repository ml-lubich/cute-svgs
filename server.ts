import { join, normalize } from "node:path";
import { createFlowerPackageZip } from "./src/packages";

const configuredPort = Number.parseInt(process.env.PORT ?? "3000", 10);
const PORT = Number.isInteger(configuredPort) && configuredPort > 0 ? configuredPort : 3000;
const publicDir = join(import.meta.dir, "public");
const svgDir = join(publicDir, "svgs");

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

const packageRoutePattern = /^\/packages\/([a-z0-9]+(?:-[a-z0-9]+)*)\.zip$/;

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

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function getSvgTitle(svgContent: string, fallback: string): string {
  return svgContent.match(/<title id="[^"]+">([^<]+)<\/title>/)?.[1] ?? fallback;
}

async function getPackageResponse(pathname: string): Promise<Response | null> {
  const packageMatch = pathname.match(packageRoutePattern);

  if (!packageMatch) {
    return null;
  }

  const slug = packageMatch[1];
  const svgFile = Bun.file(join(svgDir, `${slug}.svg`));

  if (!(await svgFile.exists())) {
    return new Response("Not found", { status: 404 });
  }

  const svgContent = await svgFile.text();
  const zip = createFlowerPackageZip({
    slug,
    title: getSvgTitle(svgContent, slug),
    svgContent
  });

  return new Response(zip, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Disposition": `attachment; filename="${slug}-package.zip"`,
      "Content-Type": "application/zip"
    }
  });
}

export function startServer(): void {
  Bun.serve({
    port: PORT,
    async fetch(request: Request): Promise<Response> {
      const { pathname } = new URL(request.url);
      const packageResponse = await getPackageResponse(pathname);

      if (packageResponse) {
        return packageResponse;
      }

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

  console.log(`Cute SVGs server running on http://localhost:${PORT}`);
}

if (import.meta.main) {
  try {
    startServer();
  } catch (error: unknown) {
    console.error(
      `Cute SVGs server could not bind to http://localhost:${PORT}. Stop the existing cute-svgs server before starting another one. Cause: ${getErrorMessage(error)}`
    );
    process.exit(1);
  }
}
