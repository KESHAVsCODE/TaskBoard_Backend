const Task = require("../models/Task");

const createTask = async (req, res) => {
  const { listId, taskName } = req.body;
  try {
    const data = await Task.create({ taskName, ListId: listId });
    console.log(data);
    res.status(200).json({ status: "success", task: data });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "failed", message: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.body;
  // res.status(200).json({ status: "success", task: taskId });
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

    await task.destroy();

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

module.exports = { createTask, deleteTask };
