// Serves dist/ on http://localhost:8080

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = "dist";
const port = 8080;

const types: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
};

const server = createServer(async (req, res) => {
  let path = (req.url ?? "/").split("?")[0] ?? "/";
  if (path.endsWith("/")) path += "index.html";
  const file = join(root, normalize(path));

  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
});

server.listen(port, () => console.log(`http://localhost:${port}`));
