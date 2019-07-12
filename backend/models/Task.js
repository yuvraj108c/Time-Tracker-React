const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
  startTime: String,
  endTime: String,
  createdOn: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("tasks", taskSchema);
