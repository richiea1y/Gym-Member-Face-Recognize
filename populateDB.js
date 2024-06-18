import { sequelize } from "./app.js";

const databaseName = 'gym_db';

createDatabase();

export default async function createDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // Use raw query to create the database
        await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);
        console.log(`Database "${databaseName}" created or already exists.`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
}
