const { getDatabase } = require('../config/database');

// Función para guardar una compra en la colección 'purchases'
async function savePurchase(purchaseData) {
    try {
        console.log('Saving purchase to MongoDB Atlas...');
        
        // Obtener la base de datos conectada
        const db = getDatabase();
        
        // Insertar el documento en la colección 'purchases'
        const result = await db.collection('purchases').insertOne(purchaseData);
        
        console.log('Purchase saved successfully:', result.ops[0]);
        return result.ops[0]; // Devuelve el documento guardado
    } catch (error) {
        console.error('Error saving purchase to MongoDB Atlas:', error);
        throw error;
    }
}

module.exports = { savePurchase };
