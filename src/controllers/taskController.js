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
// const deleteTask = async (req, res) => {
//   const {  } = req.body;
//   if (!taskName || !listId) return res.send("All fields arr required");
//   console.log(taskName);
//   try {
//     const data = await Task.create({ taskName, ListId: listId });
//     console.log(data);
//     res
//       .status(200)
//       .json({ status: "success", message: "list created successfully" });
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ status: "failed", message: error.message });
//   }
// };

module.exports = { createTask };
