import { describe, expect, test } from "bun:test";
import { readdir, readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { createFlowerPackageHtml, createFlowerPackageZip } from "../src/packages";

const rootDir = join(import.meta.dir, "..");
const publicDir = join(rootDir, "public");
const svgDir = join(publicDir, "svgs");
const indexPath = join(publicDir, "index.html");

type SvgAsset = {
  fileName: string;
  content: string;
};

async function getSvgAssets(): Promise<SvgAsset[]> {
  const fileNames = (await readdir(svgDir))
    .filter((fileName: string) => fileName.endsWith(".svg"))
    .sort();

  return Promise.all(
    fileNames.map(async (fileName: string): Promise<SvgAsset> => {
      const content = await readFile(join(svgDir, fileName), "utf8");

      return { fileName, content };
    })
  );
}

async function getIndexHtml(): Promise<string> {
  return readFile(indexPath, "utf8");
}

function getImageSources(html: string): string[] {
  return Array.from(html.matchAll(/<img\s+[^>]*src="([^"]+)"/g), (match: RegExpMatchArray): string => match[1]).sort();
}

function getDownloadLinks(html: string): string[] {
  return Array.from(
    html.matchAll(/<a\s+[^>]*class="download-button"[^>]*href="([^"]+)"[^>]*download/g),
    (match: RegExpMatchArray): string => match[1]
  ).sort();
}

function getAttributeValues(content: string, attributeName: string): string[] {
  const pattern = new RegExp(`${attributeName}="([^"]+)"`, "g");

  return Array.from(content.matchAll(pattern), (match: RegExpMatchArray): string => match[1]);
}

function getReferencedIds(content: string): string[] {
  const urlReferences = Array.from(
    content.matchAll(/url\(#([^)]+)\)/g),
    (match: RegExpMatchArray): string => match[1]
  );
  const labelledByIds = getAttributeValues(content, "aria-labelledby").flatMap((value: string): string[] =>
    value.split(/\s+/).filter(Boolean)
  );

  return [...urlReferences, ...labelledByIds].sort();
}

function getZipEntryNames(zip: Uint8Array): string[] {
  const decoder = new TextDecoder();
  const view = new DataView(zip.buffer, zip.byteOffset, zip.byteLength);
  const names: string[] = [];
  let offset = 0;

  while (offset + 4 <= zip.length && view.getUint32(offset, true) === 0x04034b50) {
    const compressedSize = view.getUint32(offset + 18, true);
    const fileNameLength = view.getUint16(offset + 26, true);
    const extraLength = view.getUint16(offset + 28, true);
    const nameStart = offset + 30;
    const nameEnd = nameStart + fileNameLength;

    names.push(decoder.decode(zip.slice(nameStart, nameEnd)));
    offset = nameEnd + extraLength + compressedSize;
  }

  return names.sort();
}

describe("flower SVG gallery", () => {
  test("renders every shipped SVG exactly once from the gallery", async () => {
    const assets = await getSvgAssets();
    const indexHtml = await getIndexHtml();
    const expectedSources = assets.map((asset: SvgAsset): string => `svgs/${asset.fileName}`).sort();

    expect(getImageSources(indexHtml)).toEqual(expectedSources);
  });

  test("keeps headings, image alts, and descriptions available for every SVG card", async () => {
    const indexHtml = await getIndexHtml();
    const cardBlocks = Array.from(indexHtml.matchAll(/<article class="card">([\s\S]*?)<\/article>/g));
    const assets = await getSvgAssets();

    expect(cardBlocks).toHaveLength(assets.length);

    for (const cardBlock of cardBlocks) {
      const cardHtml = cardBlock[1];
      const heading = cardHtml.match(/<h2>([^<]+)<\/h2>/)?.[1] ?? "";
      const source = cardHtml.match(/<img\s+[^>]*src="([^"]+)"/)?.[1] ?? "";
      const alt = cardHtml.match(/<img\s+[^>]*alt="([^"]+)"/)?.[1] ?? "";
      const description = cardHtml.match(/<p class="card-description">([^<]+)<\/p>/)?.[1] ?? "";

      expect(heading.trim().length).toBeGreaterThan(3);
      expect(source).toMatch(/^svgs\/[a-z0-9-]+\.svg$/);
      expect(alt.trim().length).toBeGreaterThan(12);
      expect(description.trim().length).toBeGreaterThan(8);
    }
  });

  test("links every gallery card to a self-contained package download", async () => {
    const assets = await getSvgAssets();
    const indexHtml = await getIndexHtml();
    const expectedPackageLinks = assets
      .map((asset: SvgAsset): string => `packages/${asset.fileName.replace(/\.svg$/, ".zip")}`)
      .sort();

    expect(getDownloadLinks(indexHtml)).toEqual(expectedPackageLinks);
  });

  test("exposes the global rotation toggle and runtime enhancer", async () => {
    const indexHtml = await getIndexHtml();

    expect(indexHtml).toContain('<body data-rotation="on">');
    expect(indexHtml).toContain('<script src="app.js" defer></script>');
    expect(indexHtml).toContain('id="rotation-toggle"');
    expect(indexHtml).toContain('type="checkbox"');
  });
});

describe("flower package downloads", () => {
  test("create browser-openable package html that references the bundled SVG", () => {
    const html = createFlowerPackageHtml({
      slug: "rose-bloom",
      title: "Rose Bloom",
      svgContent: "<svg></svg>"
    });

    expect(html).toContain("<title>Rose Bloom</title>");
    expect(html).toContain('<img src="./flower.svg" alt="Rose Bloom" />');
    expect(html).not.toMatch(/https?:\/\//i);
  });

  test("create zip packages with index, SVG, and plain text instructions", () => {
    const zip = createFlowerPackageZip({
      slug: "rose-bloom",
      title: "Rose Bloom",
      svgContent: "<svg><style>@keyframes bloom {}</style></svg>"
    });

    expect(getZipEntryNames(zip)).toEqual(["README.txt", "flower.svg", "index.html"]);
    expect(zip[0]).toBe(0x50);
    expect(zip[1]).toBe(0x4b);
  });
});

describe("flower SVG assets", () => {
  test("keeps Rose Vine Twirl transparent for the shared gallery card", async () => {
    const content = await readFile(join(svgDir, "emerald-vine-roses.svg"), "utf8");

    expect(content).not.toContain('id="evBg"');
    expect(content).not.toMatch(/<rect\s+width="240"\s+height="260"\s+fill=/);
  });

  test("use the standalone accessible SVG shell", async () => {
    const assets = await getSvgAssets();

    for (const asset of assets) {
      expect(asset.content).toStartWith("<svg ");
      expect(asset.content).toContain('xmlns="http://www.w3.org/2000/svg"');
      expect(asset.content).toContain("viewBox=");
      expect(asset.content).toContain('role="img"');
      expect(asset.content).toMatch(/aria-labelledby="[^"]+"/);
      expect(asset.content).toMatch(/<title id="[^"]+">[^<]+<\/title>/);
      expect(asset.content).toMatch(/<desc id="[^"]+">[^<]+<\/desc>/);
      expect(asset.content.trim()).toEndWith("</svg>");
    }
  });

  test("keep internal SVG references resolvable", async () => {
    const assets = await getSvgAssets();

    for (const asset of assets) {
      const ids = getAttributeValues(asset.content, "id");
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);

      for (const referencedId of getReferencedIds(asset.content)) {
        expect(uniqueIds.has(referencedId)).toBeTrue();
      }
    }
  });

  test("remain animated without scripts or external resources", async () => {
    const assets = await getSvgAssets();

    for (const asset of assets) {
      expect(asset.content).toContain("@keyframes");
      expect(asset.content).toContain("animation:");
      expect(asset.content).not.toMatch(/<script\b/i);
      expect(asset.content).not.toMatch(/(?:src|href|xlink:href)="https?:\/\//i);
      expect(asset.content).not.toMatch(/(?:xlink:)?href="(?!#)/i);
    }
  });

  test("use catalog-friendly kebab-case file names", async () => {
    const assets = await getSvgAssets();

    for (const asset of assets) {
      expect(basename(asset.fileName)).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*\.svg$/);
      expect(asset.fileName.length).toBeLessThanOrEqual(28);
    }
  });
});