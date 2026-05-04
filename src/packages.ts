const textEncoder = new TextEncoder();

export type ZipEntry = {
  path: string;
  content: string;
};

export type FlowerPackage = {
  slug: string;
  title: string;
  svgContent: string;
};

const crcTable: Uint32Array = createCrcTable();

function createCrcTable(): Uint32Array {
  const table = new Uint32Array(256);

  for (let index = 0; index < 256; index += 1) {
    let value = index;

    for (let bit = 0; bit < 8; bit += 1) {
      value = (value & 1) === 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }

    table[index] = value >>> 0;
  }

  return table;
}

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;

  for (const byte of bytes) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function encodeText(value: string): Uint8Array {
  return textEncoder.encode(value);
}

function writeUint16(view: DataView, offset: number, value: number): void {
  view.setUint16(offset, value, true);
}

function writeUint32(view: DataView, offset: number, value: number): void {
  view.setUint32(offset, value >>> 0, true);
}

function concatBytes(chunks: Uint8Array[]): Uint8Array {
  const length = chunks.reduce((total: number, chunk: Uint8Array): number => total + chunk.length, 0);
  const output = new Uint8Array(length);
  let offset = 0;

  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.length;
  }

  return output;
}

function createLocalHeader(fileName: Uint8Array, content: Uint8Array, checksum: number): Uint8Array {
  const header = new Uint8Array(30);
  const view = new DataView(header.buffer);

  writeUint32(view, 0, 0x04034b50);
  writeUint16(view, 4, 20);
  writeUint16(view, 6, 0x0800);
  writeUint16(view, 8, 0);
  writeUint16(view, 10, 0);
  writeUint16(view, 12, 0);
  writeUint32(view, 14, checksum);
  writeUint32(view, 18, content.length);
  writeUint32(view, 22, content.length);
  writeUint16(view, 26, fileName.length);
  writeUint16(view, 28, 0);

  return header;
}

function createCentralDirectoryHeader(
  fileName: Uint8Array,
  content: Uint8Array,
  checksum: number,
  localHeaderOffset: number
): Uint8Array {
  const header = new Uint8Array(46);
  const view = new DataView(header.buffer);

  writeUint32(view, 0, 0x02014b50);
  writeUint16(view, 4, 20);
  writeUint16(view, 6, 20);
  writeUint16(view, 8, 0x0800);
  writeUint16(view, 10, 0);
  writeUint16(view, 12, 0);
  writeUint16(view, 14, 0);
  writeUint32(view, 16, checksum);
  writeUint32(view, 20, content.length);
  writeUint32(view, 24, content.length);
  writeUint16(view, 28, fileName.length);
  writeUint16(view, 30, 0);
  writeUint16(view, 32, 0);
  writeUint16(view, 34, 0);
  writeUint16(view, 36, 0);
  writeUint32(view, 38, 0);
  writeUint32(view, 42, localHeaderOffset);

  return header;
}

function createEndOfCentralDirectory(entryCount: number, centralDirectorySize: number, centralDirectoryOffset: number): Uint8Array {
  const footer = new Uint8Array(22);
  const view = new DataView(footer.buffer);

  writeUint32(view, 0, 0x06054b50);
  writeUint16(view, 4, 0);
  writeUint16(view, 6, 0);
  writeUint16(view, 8, entryCount);
  writeUint16(view, 10, entryCount);
  writeUint32(view, 12, centralDirectorySize);
  writeUint32(view, 16, centralDirectoryOffset);
  writeUint16(view, 20, 0);

  return footer;
}

export function createZip(entries: ZipEntry[]): Uint8Array {
  const localChunks: Uint8Array[] = [];
  const centralChunks: Uint8Array[] = [];
  let offset = 0;

  for (const entry of entries) {
    const fileName = encodeText(entry.path);
    const content = encodeText(entry.content);
    const checksum = crc32(content);
    const localHeader = createLocalHeader(fileName, content, checksum);
    const centralHeader = createCentralDirectoryHeader(fileName, content, checksum, offset);

    localChunks.push(localHeader, fileName, content);
    centralChunks.push(centralHeader, fileName);
    offset += localHeader.length + fileName.length + content.length;
  }

  const centralDirectoryOffset = offset;
  const centralDirectory = concatBytes(centralChunks);
  const footer = createEndOfCentralDirectory(entries.length, centralDirectory.length, centralDirectoryOffset);

  return concatBytes([...localChunks, centralDirectory, footer]);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function createFlowerPackageHtml(packageInfo: FlowerPackage): string {
  const title = escapeHtml(packageInfo.title);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      font-family: Avenir Next, Trebuchet MS, sans-serif;
      color: #26333b;
      background: linear-gradient(180deg, #f7fff2 0%, #eefdf3 56%, #f1f6ff 100%);
    }
    main {
      width: min(92vw, 520px);
      text-align: center;
    }
    h1 {
      margin: 0 0 18px;
      font-size: clamp(1.7rem, 8vw, 2.7rem);
      line-height: 1.1;
    }
    img {
      display: block;
      width: min(76vw, 360px);
      height: auto;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <main>
    <h1>${title}</h1>
    <img src="./flower.svg" alt="${title}" />
  </main>
</body>
</html>
`;
}

export function createFlowerReadme(packageInfo: FlowerPackage): string {
  return `${packageInfo.title}

1. Open index.html in a web browser.
2. Keep flower.svg beside index.html.
3. The animation effects are embedded inside flower.svg.
`;
}

export function createFlowerPackageZip(packageInfo: FlowerPackage): Uint8Array {
  return createZip([
    {
      path: "index.html",
      content: createFlowerPackageHtml(packageInfo)
    },
    {
      path: "flower.svg",
      content: packageInfo.svgContent
    },
    {
      path: "README.txt",
      content: createFlowerReadme(packageInfo)
    }
  ]);
}