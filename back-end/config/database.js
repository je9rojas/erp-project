const { MongoClient } = require('mongodb');

let database;

// Función para conectar a la base de datos MongoDB
async function connectToDatabase() {
    try {
        console.log('Connecting to MongoDB Atlas...');
        
        // Crear el cliente MongoDB con el URI desde variables de entorno
        const client = new MongoClient(process.env.MONGO_URI);
        
        // Intentar conexión
        await client.connect();
        
        // Conectar a la base de datos específica
        database = client.db('erp_db');
        
        console.log('Connected to MongoDB Atlas. Database: erp_db');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        throw error;
    }
}

// Función para obtener la base de datos ya conectada
function getDatabase() {
    if (!database) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return database;
}

module.exports = { connectToDatabase, getDatabase };
