const mysql = require('mysql2/promise');

async function checkUserDataInDatabase(email) {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'demo'
        });

        // Query untuk mencari data user berdasarkan email
        const [rows] = await connection.execute(
            'SELECT * FROM oc_customer WHERE email = ?',
            [email]
        );
        await connection.end();
        return rows;

    } catch (error) {
        console.error('Error querying database:', error);
        throw error;
    }
}

module.exports = { checkUserDataInDatabase };