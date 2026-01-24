"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Infografis extends Model {
    static associate(models) {
      // define associations here if necessary
    }
  }

  Infografis.init(
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
      modelName: "Infografis",
    }
  );

  return Infografis;
};
