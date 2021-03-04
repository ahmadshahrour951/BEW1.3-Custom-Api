const { Sequelize } = require('sequelize');

const db = new Sequelize('socialorm', 'root', 'Shahrour95!', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
});

module.exports = db;
