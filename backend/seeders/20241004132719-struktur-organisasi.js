"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "StrukturOrganisasis", // table name in plural
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
    return queryInterface.bulkDelete("StrukturOrganisasis", { id: 1 }, {});
  },
};
