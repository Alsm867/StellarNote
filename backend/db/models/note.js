"use strict";
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      notebookId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  Note.associate = function (models) {
    // associations can be defined here
    Note.belongsTo(models.User, { foreignKey: "userId" });
    Note.belongsTo(models.Notebook, {
      foreignKey: "notebookId",
    });
  };
  return Note;
};
