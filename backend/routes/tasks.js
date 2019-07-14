const express = require("express");
const router = express.Router();
const Tasks = require("../models/Task");
const Categories = require("../models/Category");

// Get all tasks
router.get("/", async (_, res) => {
  try {
    Tasks.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category"
        }
      }
    ]).then(data => res.json(data));
  } catch (err) {
    res.status(500).json("Error: " + err);
    throw new Error(err);
  }
});

// Post a category
router.post("/", async (req, res) => {
  try {
    const { name, category, startTime, endTime, duration } = req.body;
    Categories.findOne({ name: category }).then(c => {
      const newTask = new Tasks({
        name,
        category: c._id,
        startTime,
        endTime,
        duration
      });
      newTask.save((err, t) => {
        console.log(err ? err : t);
        res.json(err ? err : t);
      });
    });
  } catch (err) {
    res.status(500).json("Error: " + err);
    throw new Error(err);
  }
});

module.exports = router;
