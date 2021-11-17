'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Notes', [
        {
          title: "Step One to Bike Riding",
          userId: 1,
          notebookId: 1,
          content:
            "Find a bike that fits you: You should be able to straddle your bike with your feet flat on the ground and your crotch at least a couple inches above the frame. A bike that’s comfortable will be easier to steer and control.",
          createdAt: randomDate(new Date(2012, 0, 1), new Date()),
          updatedAt: new Date(),
        },
        {
          title: "Step Two to Bike Riding",
          userId: 1,
          notebookId: 1,
          content:
            "Make sure your helmet fits: A good-fitting helmet should be snug but not too tight. It should sit level on your head (not tilted back) with the front edge one inch or less above your eyebrows so your forehead is protected.",
          createdAt: randomDate(new Date(2012, 0, 1), new Date()),
          updatedAt: new Date(),
        },
        {
          title: "Get the Groceries",
          userId: 1,
          notebookId: 2,
          content:
            "Remember to get the groceries when I get out of work. Otherwise I'll never get them...",
          createdAt: randomDate(new Date(2012, 0, 1), new Date()),
          updatedAt: new Date(),
        },
        {
          title: "Buy a New Pet?",
          userId: 1,
          notebookId: 3,
          content:
            "Giraffes could possibly make a great pet...",
          createdAt: randomDate(new Date(2012, 0, 1), new Date()),
          updatedAt: new Date(),
        },
        {
          title: "Notes on Giraffes?",
          userId: 1,
          notebookId: 3,
          content:
            "In order to get the food they need, giraffes have to live in a habitat that meets certain conditions, such as having tall trees and plenty of space. BUT, they do not like to live in forests...",
          createdAt: randomDate(new Date(2012, 0, 1), new Date()),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Notes', null, {});
  }
};

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}
