const mysql = require('mysql2/promise'); // Usamos la versión "promise" para async/await
const dotenv = require('dotenv');

dotenv.config();

// Configuración de la conexión (usa variables de entorno)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cursos',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;