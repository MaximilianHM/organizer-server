const express = require("express");
const router = express.Router();
const Task = require("../models/task.model");
const Category = require("../models/category.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");

router.post("/api/tasks", async (req, res, next) => {
  try {
    const { taskName, status, deadLine, description, categoryId } = req.body;

    const createdTask = await Task.create({
      taskName,
      status,
      deadLine,
      description,
      category: categoryId,
    });

    await Category.findByIdAndUpdate(categoryId, {
      $push: { tasks: createdTask._id },
    });

    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/api/tasks", async (req, res, next) => {
  try {
    const allTasks = await Task.find();

    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ! should I made the route base on categoryId?
// ! problems to display the tasks by category
// router.get("/api/:categoryId/:taskId", async (req, res, next) => {
//   try {
//     const { taskId } = req.params;
//     const { category: categoryId } = req.body;
//     const tasksByCategory = await Task.findById(categoryId);

//     res.status(200).json(tasksByCategory);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// ! problems to update the value of models obj
router.put("/api/tasks/:taskId", async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { taskName, status, deadLine, description } = req.body;

    const updateTask = await Task.findByIdAndUpdate(taskId, [
      { taskName },
      { status },
      { deadLine },
      { description },
      { new: true },
    ]);

    res.status(200).json(updateTask);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/api/tasks/:taskId", async (req, res, next) => {
  try {
    const { taskId } = req.params;
    await Task.findByIdAndDelete(taskId);

    res.status(200).json(taskId);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
