"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("password123", 10); // Hash the password

    return queryInterface.bulkInsert(
      "Users", // Target table
      [
        {
          username: "johndoe", // Username of the user
          email: "johndoe@example.com", // Email of the user
          password: hashedPassword, // Hashed password
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // This will remove all users
    return queryInterface.bulkDelete("Users", null, {});
  },
};
