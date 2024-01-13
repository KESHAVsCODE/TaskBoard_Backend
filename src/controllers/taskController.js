const Task = require("../models/Task");

const createTask = async (req, res) => {
  const { listId, taskName } = req.body;
  if (!listId || !taskName) {
    return res.status(400).json({
      status: "failed",
      message: "List id and Task name is required",
    });
  }
  try {
    const data = await Task.create({ taskName, ListId: listId });
    console.log(data);
    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.body;
  if (!taskId) {
    return res.status(400).json({
      status: "failed",
      message: "Task id is required",
    });
  }

  try {
    const task = await Task.findOne({
      where: {
        taskId: taskId,
      },
    });

    if (!task) {
      return res.status(404).json({
        status: "failed",
        message: "Task not found",
      });
    }

    await task.destroy({ force: true });

    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};

const moveTask = async (req, res) => {
  const { taskId, sourceListId, destinationListId } = req.body;

  if (!taskId || !sourceListId || !destinationListId) {
    return res.status(400).json({
      status: "failed",
      message: "taskId, sourceListId and destinationListId all are required",
    });
  }

  try {
    // Find the task in the source list
    const task = await Task.findOne({
      where: {
        taskId: taskId,
        ListId: sourceListId,
      },
    });

    if (!task) {
      return res.status(404).json({
        status: "failed",
        message: "Task not found in the source list",
      });
    }

    // Update the task's ListId to the destination list
    task.ListId = destinationListId;
    await task.save();

    res.status(200).json({
      status: "success",
      message: "Task moved successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};

module.exports = { createTask, deleteTask, moveTask };
