const { Sequelize } = require('sequelize');
const db = require('../config/database');

const Institution = db.define('institution', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = Institution;
