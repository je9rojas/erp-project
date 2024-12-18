const { handlePurchase } = require('../controllers/purchaseController');

function purchaseRoutes(req, res) {
    if (req.method === 'POST' && req.url === '/purchases') {
        handlePurchase(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found in purchases' }));
    }
}

module.exports = purchaseRoutes;
