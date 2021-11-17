'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert(
        "Notebooks",
        [
          {
            name: "How to Ride a Bike",
            userId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Groceries",
            userId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Pets",
            userId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    },


  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete("Notebooks", null, {});
  }
};
