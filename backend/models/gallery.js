"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {
    static associate(models) {
      // define associations here if necessary
    }
  }

  Gallery.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Gallery",
    }
  );

  return Gallery;
};
