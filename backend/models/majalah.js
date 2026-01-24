"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Majalah extends Model {
    static associate(models) {
      // define associations here if necessary
    }
  }

  Majalah.init(
    {
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Majalah",
    }
  );

  return Majalah;
};
