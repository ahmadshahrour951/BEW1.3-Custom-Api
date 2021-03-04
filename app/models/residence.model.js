module.exports = (sequelize, DataTypes) => {
  const Residence = sequelize.define('residence', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
  return Residence;
};
