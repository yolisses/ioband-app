import fs from "fs";
import httpProxy from "http-proxy";
import https from "https";

// SSL
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

const proxy = httpProxy.createProxyServer({
  timeout: 5000,
  proxyTimeout: 5000,
});

// Prevent crash + silence harmless errors
proxy.on("error", (err, req, res) => {
  if (err.code === "ECONNRESET" || err.code === "ECONNABORTED") {
    return; // Do not log these, they are harmless
  }

  console.error("Proxy error:", err);

  if (!res.headersSent && !res.writableEnded && !res.destroyed) {
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Bad Gateway");
  }
});

// Timeout protection
proxy.on("proxyReq", (proxyReq) => {
  proxyReq.setTimeout(5000, () => proxyReq.abort());
});

https
  .createServer(options, (req, res) => {
    proxy.web(req, res, { target: "http://localhost:3000" });
  })
  .listen(8443, () => {
    console.log("HTTPS proxy running on https://localhost:8443");
  });
