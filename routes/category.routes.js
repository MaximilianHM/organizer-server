const express = require("express");
const router = express.Router();
const Category = require("../models/category.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");

router.post("/api/categories", isAuthenticated, async (req, res, next) => {
  try {
    const { categoryName, usernameId } = req.body;

    const createdCategory = await Category.create({
      categoryName,
      usernameId: usernameId,
      tasks: [],
    });

    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/api/categories", isAuthenticated, async (req, res, next) => {
  try {
    const user = req.payload;

    const allCategories = await Category.find({
      usernameId: user._id,
    }).populate("tasks");

    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get(
  "/api/categories/:categoryId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const user = req.payload;

      const { categoryId } = req.params;
      const oneCategory = await Category.findById(categoryId).populate("tasks");

      res.status(200).json(oneCategory);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.put(
  "/api/categories/:categoryId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const { categoryName } = req.body;

      const updateCategory = await Category.findByIdAndUpdate(
        categoryId,
        { categoryName },
        { new: true }
      );

      res.status(200).json(updateCategory);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.delete(
  "/api/categories/:categoryId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      await Category.findByIdAndDelete(categoryId);

      res.status(200).json(categoryId);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;
