// Importa la función para obtener la conexión a la base de datos
const { getDatabase } = require('../config/database');

// Función para guardar una nueva compra en la base de datos
async function savePurchase(purchaseData) {
    console.log('Saving purchase to MongoDB Atlas...');
    const db = getDatabase(); // Obtiene la instancia de la base de datos
    const collection = db.collection('purchases'); // Selecciona la colección 'purchases'

    try {
        // Inserta la nueva compra en la colección
        const result = await collection.insertOne(purchaseData);
        console.log('Purchase saved successfully:', { ...purchaseData, _id: result.insertedId });
        // Devuelve la compra guardada incluyendo el ID generado por MongoDB
        return { ...purchaseData, _id: result.insertedId };
    } catch (error) {
        console.error('Error saving purchase to MongoDB Atlas:', error);
        throw error; // Lanza el error para que sea manejado por el controlador
    }
}

// Función para obtener todas las compras desde la base de datos
async function getAllPurchases() {
    console.log('Fetching all purchases from MongoDB Atlas...');
    const db = getDatabase(); // Obtiene la instancia de la base de datos
    const collection = db.collection('purchases'); // Selecciona la colección 'purchases'

    try {
        // Recupera todas las compras en forma de un arreglo
        const purchases = await collection.find({}).toArray();
        console.log('Fetched purchases:', purchases);
        return purchases; // Devuelve todas las compras
    } catch (error) {
        console.error('Error fetching purchases from MongoDB Atlas:', error);
        throw error; // Lanza el error para que sea manejado por el controlador
    }
}

// Exporta las funciones para que puedan ser usadas en otros módulos
module.exports = { savePurchase, getAllPurchases };






/*

const { getDatabase } = require('../config/database');

async function savePurchase(purchaseData) {
    console.log('Saving purchase to MongoDB Atlas...');
    const db = getDatabase();
    const collection = db.collection('purchases');

    try {
        const result = await collection.insertOne(purchaseData);
        console.log('Purchase saved successfully:', { ...purchaseData, _id: result.insertedId });
        return { ...purchaseData, _id: result.insertedId }; // Incluye el ID generado por MongoDB
    } catch (error) {
        console.error('Error saving purchase to MongoDB Atlas:', error);
        throw error;
    }
}

module.exports = { savePurchase };
*/