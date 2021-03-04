module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('event', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  return Event;
};
