module.exports = (sequelize, DataTypes) => {
  const Institution = sequelize.define('institution', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
  return Institution;
};
