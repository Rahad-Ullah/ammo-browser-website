import express from "express";
import compression from "compression";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import { createRequestHandler } from "@react-router/express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";

// React Router build output
const build = await import("./build/server/index.js");

// Static assets (client build)
app.use(compression());
app.use(morgan("tiny"));
app.use(
  express.static(path.join(__dirname, "build", "client"), {
    immutable: true,
    maxAge: "1y",
  })
);

// Everything else -> React Router SSR handler
app.all(
  "*",
  createRequestHandler({
    build,
    mode: process.env.NODE_ENV || "production",
  })
);

app.listen(port, host, () => {
  console.log(`React Router SSR running at http://${host}:${port}`);
});
