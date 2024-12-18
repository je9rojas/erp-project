const { savePurchase } = require('../services/purchaseService');

async function handlePurchase(req, res) {
    try {
        let body = '';
        req.on('data', chunk => (body += chunk));
        req.on('end', async () => {
            const purchaseData = JSON.parse(body);
            const result = await savePurchase(purchaseData);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Purchase saved successfully', data: result }));
        });
    } catch (error) {
        console.error('Error handling purchase:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
}

module.exports = { handlePurchase };
