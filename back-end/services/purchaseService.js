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
