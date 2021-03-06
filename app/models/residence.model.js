module.exports = (sequelize, DataTypes) => {
  const Residence = sequelize.define('residence', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    max_capacity: {
      type: DataTypes.INTEGER,
      default: 100
    }
  });
  return Residence;
};
