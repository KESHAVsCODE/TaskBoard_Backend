const { DataTypes } = require("sequelize");
const db = require("../config/database");
const List = require("./List");

const Task = db.define(
  "Task",
  {
    taskId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    taskName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tasks",
  }
);

List.hasMany(Task, {
  foreignKey: {
    type: DataTypes.UUID,
    name: "ListId",
  },
});

Task.belongsTo(List);

// {
//   foreignKey: {
//     type: DataTypes.UUID,
//     allowNull: false,
//   },
// }

module.exports = Task;
