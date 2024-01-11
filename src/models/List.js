const { DataTypes } = require("sequelize");
const db = require("../config/database");
const User = require("./User"); // Import the User model

const List = db.define(
  "List",
  {
    listId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    listName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "lists",
  }
);

// Define the association between User and List
User.hasMany(List, {
  foreignKey: {
    type: DataTypes.UUID,
    name: "UserId",
  },
});

List.belongsTo(User);
/* 
    {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
}
 */

module.exports = List;
