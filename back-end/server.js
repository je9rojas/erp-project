const http = require('http');
const { loadEnv } = require('./config/env');
const { connectToDatabase } = require('./config/database');
const purchaseRoutes = require('./routes/purchases');

// Cargar variables de entorno
loadEnv();

const PORT = process.env.PORT || 3000;

// Crear servidor HTTP
const server = http.createServer((req, res) => {
    // Manejar rutas de compras
    if (req.url.startsWith('/purchases')) {
        purchaseRoutes(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

// Conectar a la base de datos y arrancar el servidor
connectToDatabase()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to start server:', err);
    });
