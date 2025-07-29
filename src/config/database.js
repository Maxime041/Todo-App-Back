const mysql = require('mysql2/promise');
const { Sequelize } = require("sequelize");

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  await connection.end();

  // 2. Instancier Sequelize
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "mariadb",
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );

  // 3. Tester la connexion
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
    throw error;
  }

  return sequelize;
}

module.exports = { initializeDatabase };