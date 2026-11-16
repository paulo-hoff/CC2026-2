#!/usr/bin/env node
/**
 * serve.js — servidor HTTP estático mínimo (somente Node nativo).
 * Uso: npm start   →  http://localhost:8080
 * Alternativa sem Node: python3 -m http.server 8080
 * Também é usado pelo smoke test (porta 0 = porta livre aleatória).
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT } from './lib/features.js';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

export function createStaticServer(root = ROOT) {
  return createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      let relative = decodeURIComponent(url.pathname);
      if (relative.endsWith('/')) relative += 'index.html';
      const file = path.normalize(path.join(root, relative));
      if (!file.startsWith(root)) {
        res.writeHead(403).end('Forbidden');
        return;
      }
      if (!(await stat(file)).isFile()) throw new Error('not a file');
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
      res.end(await readFile(file));
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('404 Not Found');
    }
  });
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const port = Number(process.env.PORT ?? 8080);
  createStaticServer().listen(port, () => console.log(`Servidor em http://localhost:${port}  (Ctrl+C para parar)`));
}
