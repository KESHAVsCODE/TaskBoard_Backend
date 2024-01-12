const List = require("../models/List");
const User = require("../models/User");
const Task = require("../models/Task");
require("dotenv").config();

const createList = async (req, res) => {
  const { listName, userId } = req.body;
  try {
    const data = await List.create({ listName, UserId: userId });
    console.dir(data);
    res.status(200).json({ status: "success", list: data });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "failed", message: error.message });
  }
};

const getListData = async (req, res) => {
  const { userId } = req.body;
  try {
    // Find the user with associated lists and tasks
    const user = await User.findByPk(userId, {
      include: [
        {
          model: List,
          include: Task, // Include associated tasks for each list
        },
      ],
    });
    console.log(user);

    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }

    // Check if user has lists
    if (!user.Lists || !Array.isArray(user.Lists)) {
      return res.json({ userLists: [] }); // Return an empty array if there are no lists
    }

    // Transform the data if needed
    const transformedData = user.Lists.map((list) => ({
      listId: list.listId,
      listName: list.listName,
      tasks: Array.isArray(list.Tasks)
        ? list.Tasks.map((task) => ({
            taskId: task.taskId,
            taskName: task.taskName,
            isCompleted: task.isCompleted,
          }))
        : [],
    }));

    // Send the data to the client
    res.status(200).json({ status: "success", userLists: transformedData });
  } catch (error) {
    console.error("Error fetching user and lists:", error);
    res.status(500).json({ status: "success", error: "Internal server error" });
  }
};
module.exports = { createList, getListData };
