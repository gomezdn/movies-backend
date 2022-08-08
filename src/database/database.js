require('pg');

const { Sequelize } = require('sequelize');

const { DB_DBNAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

const db = new Sequelize(DB_DBNAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
});

module.exports = { db };
