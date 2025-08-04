const mysql = require('mysql2/promise');
const { connectToDatabase } = require('./db-utils');

async function checkUserDataInDatabase(email) {
    try {
        const connection = await connectToDatabase();
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

async function getRandomExistingEmail() {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute('SELECT email FROM oc_customer ORDER BY RAND() LIMIT 1');
        await connection.end();
        return rows[0]?.email || null;
    } catch (error) {
        console.error('Error querying database:', error);
        throw error;
    }
}

module.exports = {
    checkUserDataInDatabase,
    getRandomExistingEmail
};