"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Peraturan extends Model {
    static associate(models) {
      // define associations here if necessary
    }
  }

  Peraturan.init(
    {
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
      modelName: "Peraturan",
    }
  );

  return Peraturan;
};
