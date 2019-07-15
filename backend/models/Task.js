const mongoose = require("mongoose");
const moment = require("moment");

const taskSchema = new mongoose.Schema({
  name: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
  startTime: String,
  endTime: String,
  createdOn: {
    type: String,
    default: moment().format("YYYY-MM-DD")
  }
});

module.exports = mongoose.model("tasks", taskSchema);
