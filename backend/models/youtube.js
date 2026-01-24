"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Youtube extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  Youtube.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Youtube",
    }
  );

  return Youtube;
};
