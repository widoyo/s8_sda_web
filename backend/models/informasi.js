"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Informasi extends Model {
    static associate(models) {
      // define associations here if necessary
    }
  }

  Informasi.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Informasi",
    }
  );

  return Informasi;
};
