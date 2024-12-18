const http = require('http');
const { loadEnv } = require('./config/env');
const { connectToDatabase } = require('./config/database');
const purchaseRoutes = require('./routes/purchases');

loadEnv();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/purchases')) {
        purchaseRoutes(req, res);
    } else if (req.url === '/' || req.url.startsWith('/assets')) {
        // Servir archivos estáticos
        require('fs').readFile(`./front-end${req.url === '/' ? '/index.html' : req.url}`, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': req.url.endsWith('.css') ? 'text/css' : 'text/html' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

connectToDatabase()
    .then(() => {
        server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch(err => console.error('Failed to connect to the database:', err));
