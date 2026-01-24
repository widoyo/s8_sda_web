"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Berita extends Model {
    static associate(models) {
      // define associations here if necessary
    }
  }

  Berita.init(
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
      img: {
        type: DataTypes.STRING,
        allowNull: true, // URL for the uploaded image
      },
      highlighted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // default not highlighted
      },
    },
    {
      sequelize,
      modelName: "Berita",
    }
  );

  return Berita;
};
