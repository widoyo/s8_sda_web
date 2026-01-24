"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Dipa extends Model {
    static associate(models) {
      // define associations here if necessary
    }
  }

  Dipa.init(
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
      modelName: "Dipa",
    }
  );

  return Dipa;
};
