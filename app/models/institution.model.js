module.exports = (sequelize, DataTypes) => {
  const Institution = sequelize.define('institution', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });
  return Institution;
};
