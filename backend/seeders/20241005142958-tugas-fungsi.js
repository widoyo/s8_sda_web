"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "TugasFungsis", // Ensure this matches the plural form of your table
      [
        {
          id: 1, // explicitly setting the ID
          content: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TugasFungsis", { id: 1 }, {});
  },
};
