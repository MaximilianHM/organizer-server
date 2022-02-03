const express = require("express");
const router = express.Router();
const Task = require("../models/task.model");
const Category = require("../models/category.model");
const {} = require("./../middleware/jwt.middleware");

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
    const user = req.payload;
    console.log("user payload:>> ", user);
    const allTasks = await Task.find();

    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/api/tasks/:taskId", async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const tasksByCategory = await Task.findById(taskId);

    res.status(200).json(tasksByCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/api/tasks/:taskId", async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { taskName, status, deadLine, description } = req.body;

    const taskUpdated = await Task.findByIdAndUpdate(
      taskId,
      {
        taskName,
        status,
        deadLine,
        description,
      },
      { new: true }
    );

    res.status(200).json(taskUpdated);
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
