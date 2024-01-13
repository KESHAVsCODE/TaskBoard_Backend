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
      validate: {
        notNull: {
          msg: "UserName cannot be null.",
        },
        notEmpty: {
          msg: "UserName cannot be empty.",
        },
      },
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "User already exists",
      },
      validate: {
        notNull: {
          msg: "UserEmail cannot be null.",
        },
        notEmpty: {
          msg: "UserEmail cannot be empty.",
        },
        isEmail: {
          msg: "Invalid email address.",
        },
      },
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "UserPassword cannot be null.",
        },
        notEmpty: {
          msg: "UserPassword cannot be empty.",
        },
        len: {
          args: [6, 255],
          msg: "UserPassword must be between 6 and 255 characters.",
        },
      },
    },
  },
  {
    tableName: "users",
  }
);

module.exports = User;
