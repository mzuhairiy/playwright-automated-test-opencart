const mysql = require('mysql2/promise');

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'demo'
        });
        return connection;

    } catch (error) {
        console.error('Koneksi gagal:', error);
        throw error;
    }
}

connectToDatabase()
    .then((connection) => {
        connection.end();
    })
    .catch((error) => {
        console.error('Koneksi gagal:', error);
    });

module.exports = { connectToDatabase };