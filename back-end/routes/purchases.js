const { savePurchase } = require('../services/purchaseService');

module.exports = async function (req, res) {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const purchaseData = JSON.parse(body);
                const savedPurchase = await savePurchase(purchaseData);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Purchase saved successfully', data: savedPurchase }));
            } catch (error) {
                console.error('Error saving purchase:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error saving purchase' }));
            }
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Method not allowed' }));
    }
};
