const { DataTypes } = require("sequelize");

const db = require("../config/database");

const User = db.define(
  "User",
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "User already exists",
      },
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
  }
);

module.exports = User;
