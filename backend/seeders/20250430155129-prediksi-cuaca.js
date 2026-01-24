"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "PrediksiCuacas", // table name in plural
      [
        {
          id: 1, // explicitly setting the ID
          img: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PrediksiCuacas", { id: 1 }, {});
  },
};
