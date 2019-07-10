const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
  startTime: String,
  endTime: String,
  duration: String,
  createdOn: {
    type: Date,
    default: new Date().toISOString().slice(0, 10)
  }
});

module.exports = mongoose.model("tasks", taskSchema);
