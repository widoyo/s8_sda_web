"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Geolocation extends Model {
    static associate(models) {
      // define associations here if necessary
    }
  }

  Geolocation.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Geolocation",
    }
  );

  return Geolocation;
};
