import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import type { RequestHandler } from 'express';

const COMPRESSIBLE_EXTENSIONS = new Set(['.js', '.css', '.html', '.json', '.svg']);

export async function compressStaticAssets(rootDir = path.join(process.cwd(), 'dist')) {
  if (!fs.existsSync(rootDir)) return;

  const files: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }
      if (COMPRESSIBLE_EXTENSIONS.has(path.extname(entry.name))) {
        files.push(fullPath);
      }
    }
  };

  walk(rootDir);

  await Promise.all(files.flatMap(file => [
    fs.promises.writeFile(`${file}.gz`, zlib.gzipSync(fs.readFileSync(file), { level: 9 })),
    fs.promises.writeFile(`${file}.br`, zlib.brotliCompressSync(fs.readFileSync(file), {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11
      }
    }))
  ]));
}

const CONTENT_TYPES: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml'
};

export function expressStaticCompressed(rootDir: string): RequestHandler {
  return (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      next();
      return;
    }

    const acceptedEncoding = req.headers['accept-encoding'] || '';
    const relativePath = decodeURIComponent(req.path.replace(/^\/+/, ''));
    if (!relativePath || relativePath.includes('..')) {
      next();
      return;
    }

    const filePath = path.join(rootDir, relativePath);
    const ext = path.extname(filePath);
    if (!COMPRESSIBLE_EXTENSIONS.has(ext)) {
      next();
      return;
    }

    const encoding = acceptedEncoding.includes('br')
      ? 'br'
      : acceptedEncoding.includes('gzip')
        ? 'gzip'
        : '';
    if (!encoding) {
      next();
      return;
    }

    const compressedPath = `${filePath}.${encoding === 'br' ? 'br' : 'gz'}`;
    if (!fs.existsSync(compressedPath)) {
      next();
      return;
    }

    res.setHeader('Content-Encoding', encoding);
    res.setHeader('Content-Type', CONTENT_TYPES[ext] || 'application/octet-stream');
    res.setHeader('Vary', 'Accept-Encoding');
    res.setHeader('Cache-Control', relativePath.startsWith('assets/') ? 'public, max-age=31536000, immutable' : 'no-cache');
    res.sendFile(compressedPath);
  };
}
