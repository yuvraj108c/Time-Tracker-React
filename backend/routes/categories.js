const express = require("express");
const router = express.Router();
const Categories = require("../models/Category");

// Get all categories
router.get("/", async (_, res) => {
  try {
    const categories = await Categories.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json("Error: " + err);
    throw new Error(err);
  }
});

// Post a category
router.post("/", async (req, res) => {
  try {
    const { name, color } = req.body;
    const newCategory = await new Categories({ name, color }).save();
    res.json(newCategory);
  } catch (err) {
    res.status(500).json("Error: " + err);
    throw new Error(err);
  }
});

module.exports = router;
