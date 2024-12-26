// Importa las funciones del servicio de compras
const { savePurchase, getAllPurchases } = require('../services/purchaseService');

module.exports = async function (req, res) {
    // Manejar solicitudes POST (guardar una compra)
    if (req.method === 'POST') {
        let body = '';

        // Escuchar el evento de recepción de datos
        req.on('data', chunk => {
            body += chunk.toString(); // Construir el cuerpo de la solicitud
        });

        // Cuando se reciban todos los datos
        req.on('end', async () => {
            try {
                const purchaseData = JSON.parse(body); // Parsear los datos a JSON
                const savedPurchase = await savePurchase(purchaseData); // Guardar la compra en la base de datos
                res.writeHead(201, { 'Content-Type': 'application/json' }); // Configurar cabecera HTTP
                res.end(JSON.stringify({ message: 'Purchase saved successfully', data: savedPurchase })); // Responder con la compra guardada
            } catch (error) {
                console.error('Error saving purchase:', error); // Manejar errores en la consola
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error saving purchase' })); // Responder con error
            }
        });
    } 
    // Manejar solicitudes GET (obtener historial de compras)
    else if (req.method === 'GET') {
        try {
            const purchases = await getAllPurchases(); // Obtener todas las compras de la base de datos
            res.writeHead(200, { 'Content-Type': 'application/json' }); // Configurar cabecera HTTP
            res.end(JSON.stringify(purchases)); // Responder con el historial de compras
        } catch (error) {
            console.error('Error fetching purchases:', error); // Manejar errores en la consola
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error fetching purchases' })); // Responder con error
        }
    } 
    // Manejar otros métodos HTTP no permitidos
    else {
        res.writeHead(405, { 'Content-Type': 'application/json' }); // Configurar cabecera HTTP para método no permitido
        res.end(JSON.stringify({ message: 'Method not allowed' })); // Responder con error de método no permitido
    }
};















/*


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


*/