const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: String,
  color: String
});

module.exports = mongoose.model("categories", taskSchema);
