"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Pengumuman extends Model {
    static associate(models) {
      // define associations here if necessary
    }
  }

  Pengumuman.init(
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
      modelName: "Pengumuman",
    }
  );

  return Pengumuman;
};
