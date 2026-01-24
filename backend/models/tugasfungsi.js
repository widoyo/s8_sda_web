"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TugasFungsi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TugasFungsi.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TugasFungsi",
    }
  );
  return TugasFungsi;
};
