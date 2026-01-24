"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PrediksiCuaca extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  PrediksiCuaca.init(
    {
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PrediksiCuaca",
    }
  );

  return PrediksiCuaca;
};
