require('pg');

const { Sequelize } = require('sequelize');

const { DB_DBNAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

const db = new Sequelize(DB_DBNAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 30,
    acquire: 10000,
    idle: 3000,
  },
});

module.exports = { db };
