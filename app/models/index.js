const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.institutions = require('./institution.model')(sequelize, Sequelize);
db.residences = require('./residence.model')(sequelize, Sequelize);
db.users = require('./user.model')(sequelize, Sequelize);
db.events = require('./event.model')(sequelize, Sequelize);

// RELATIONSHIPS GO HERE

// INSTITUTIONS AND RESIDENCES -
db.institutions.hasMany(db.residences, { as: 'residences' });
db.residences.belongsTo(db.institutions, {
  as: 'institution',
  foreignKey: 'institution_id',
});

// RESIDENCES AND USERS - ONE-TO-MANY
db.residences.hasMany(db.users, { as: 'users' });
db.users.belongsTo(db.residences, {
  as: 'residence',
  foreignKey: 'residence_id',
});

// RESIDENCES AND EVENTS - ONE-TO-MANY
db.residences.hasMany(db.events, { as: 'events' });
db.events.belongsTo(db.residences, {
  as: 'residence',
  foreignKey: 'residence_id',
});

// USERS AND EVENTS - MANY-TO-MANY
db.users.belongsToMany(db.events, {
  through: 'user_event',
  as: 'users',
  foreignKey: 'user_id',
});
db.events.belongsToMany(db.users, {
  through: 'user_event',
  as: 'events',
  foreignKey: 'event_id',
});

module.exports = db;
