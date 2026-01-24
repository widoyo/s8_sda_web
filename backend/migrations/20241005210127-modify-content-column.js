"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("TugasFungsis", "content", {
      type: Sequelize.TEXT, // Change to TEXT type
      allowNull: true, // Set as needed
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("TugasFungsis", "content", {
      type: Sequelize.STRING, // Revert back to STRING type if needed
      allowNull: true, // Set as per your original definition
    });
  },
};
