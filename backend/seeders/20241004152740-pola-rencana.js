"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "PolaRencanas", // Ensure this matches the plural form of your table
      [
        {
          id: 1, // explicitly setting the ID
          pdf: "", // Ensure the pdf is valid and not null
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PolaRencanas", { id: 1 }, {});
  },
};
