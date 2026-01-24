module.exports = (sequelize, DataTypes) => {
  const LayananTerpadu = sequelize.define("LayananTerpadu", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true, // Image can be null initially
    },
  });

  return LayananTerpadu;
};
