const { Sequelize } = require('sequelize');
const db = require('../config/database');

const Residence = db.define('residence', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = Residence;