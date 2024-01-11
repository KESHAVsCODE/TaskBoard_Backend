// dbSync.js
const db = require("../config/database");
const User = require("../models/User");
const List = require("../models/List");
const Task = require("../models/Task");

// Sync the database
db.sync({ force: true }) // Set force to true if you want to drop and recreate tables
  .then(() => {
    console.log("Database synced");
    process.exit(); // Exit the process after syncing
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
    process.exit(1); // Exit with an error code
  });
