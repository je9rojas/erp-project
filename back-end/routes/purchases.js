// Importa las funciones del servicio de compras
const { savePurchase, getAllPurchases, deletePurchaseById } = require('../services/purchaseService');
const { parse } = require('url'); // Para manejar la extracción de parámetros de la URL

module.exports = async function (req, res) {
    console.log(`Nueva solicitud recibida: ${req.method} ${req.url}`); // Log para cada solicitud entrante
    const parsedUrl = parse(req.url, true); // Parsear la URL para obtener los parámetros de consulta
    let id = parsedUrl.query.id; // Intentar obtener el parámetro `id` de la consulta

    // Si no hay `id` en los parámetros de consulta, intentar extraerlo del camino de la URL
    if (!id && req.method === 'DELETE') {
        const pathParts = req.url.split('/'); // Dividir la URL en partes
        id = pathParts[pathParts.length - 1]; // Suponemos que el ID está al final del camino
        console.log('ID extraído del camino de la URL:', id);
    } else {
        console.log('ID extraído de los parámetros de consulta:', id);
    }

    // Manejar solicitudes POST (guardar una compra)
    if (req.method === 'POST') {
        console.log('Procesando solicitud POST para guardar una compra...');
        let body = '';

        req.on('data', chunk => {
            console.log('Recibiendo datos del cliente:', chunk.toString());
            body += chunk.toString(); // Construir el cuerpo de la solicitud
        });

        req.on('end', async () => {
            try {
                console.log('Datos completos recibidos:', body);
                const purchaseData = JSON.parse(body); // Parsear los datos a JSON
                const savedPurchase = await savePurchase(purchaseData); // Guardar la compra en la base de datos
                console.log('Compra guardada con éxito:', savedPurchase);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Purchase saved successfully', data: savedPurchase }));
            } catch (error) {
                console.error('Error al guardar la compra:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error saving purchase' }));
            }
        });
    } 
    // Manejar solicitudes GET (obtener historial de compras)
    else if (req.method === 'GET') {
        console.log('Procesando solicitud GET para obtener el historial de compras...');
        try {
            const purchases = await getAllPurchases(); // Obtener todas las compras de la base de datos
            console.log('Historial de compras obtenido:', purchases);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(purchases));
        } catch (error) {
            console.error('Error al obtener el historial de compras:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error fetching purchases' }));
        }
    } 
    // Manejar solicitudes DELETE (eliminar una compra por ID)
    else if (req.method === 'DELETE' && id) {
        console.log(`Procesando solicitud DELETE para eliminar la compra con ID: ${id}`);
        try {
            const deletionResult = await deletePurchaseById(id); // Llamar al servicio para eliminar la compra por ID
            console.log('Resultado de la eliminación:', deletionResult);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Purchase deleted successfully' }));
        } catch (error) {
            console.error('Error al eliminar la compra:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error deleting purchase' }));
        }
    } 
    // Manejar otros métodos HTTP no permitidos o solicitudes DELETE sin ID
    else {
        console.log('Método no permitido o falta de ID en la solicitud.');
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Method not allowed or missing ID' }));
    }
};
