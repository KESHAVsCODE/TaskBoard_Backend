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
      validate: {
        notEmpty: {
          msg: "TaskName cannot be empty.",
        },
      },
    },
  },
  {
    tableName: "tasks",
    paranoid: true,
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
