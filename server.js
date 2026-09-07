const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    let filePath;

    if (req.url === "/" || req.url === "") {
        filePath = path.join(__dirname, "index.html");
    } else {
        filePath = path.join(__dirname, req.url);
    }

    // Segurança básica
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, {
                "Content-Type": "text/plain; charset=utf-8"
            });
            res.end("Not Found");
            return;
        }

        const ext = path.extname(filePath).toLowerCase();

        const contentTypes = {
            ".html": "text/html; charset=utf-8",
            ".css": "text/css; charset=utf-8",
            ".js": "application/javascript; charset=utf-8",
            ".json": "application/json; charset=utf-8",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".gif": "image/gif",
            ".svg": "image/svg+xml",
            ".ico": "image/x-icon",
            ".webp": "image/webp"
        };

        res.writeHead(200, {
            "Content-Type": contentTypes[ext] || "application/octet-stream"
        });

        res.end(data);
    });
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Dashboard online na porta ${PORT}`);
});
