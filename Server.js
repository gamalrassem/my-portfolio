
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.method, req.url);

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write("Hello From NTI");
        res.end();
    }
    res.write("Hello Gamal! Welcome to my server.");
    res.end();
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
