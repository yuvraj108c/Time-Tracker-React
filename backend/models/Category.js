const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  color: String
});

module.exports = mongoose.model("categories", categorySchema);
