import fs from "fs";
import httpProxy from "http-proxy";
import https from "https";

// Read your self-signed SSL certificate
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Create the HTTPS server
https
  .createServer(options, (req, res) => {
    // Forward requests to your local server (e.g., localhost:3000)
    proxy.web(req, res, { target: "http://localhost:3000" });
  })
  .listen(8443, () => {
    console.log("HTTPS proxy running on https://localhost:8443");
  });
