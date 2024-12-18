const fs = require('fs');
const path = require('path');

// Función para cargar variables de entorno desde el archivo .env
function loadEnv() {
    const envPath = path.resolve(__dirname, '../../.env');
    if (fs.existsSync(envPath)) {
        require('dotenv').config({ path: envPath });
        console.log('Environment variables loaded from .env file.');
    } else {
        console.warn('.env file not found. Ensure environment variables are set.');
    }
}

module.exports = { loadEnv };
