"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rpsda extends Model {
    static associate(models) {
      // define associations here if necessary
    }
  }

  Rpsda.init(
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
      modelName: "Rpsda",
    }
  );

  return Rpsda;
};
