const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 4000;

// Db connection
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, err => {
  console.log(err ? err : `Connected to MongoDb`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/categories",  require("./routes/categories"));
app.use("/tasks", require("./routes/tasks"));

app.listen(PORT, err => {
  console.log(err ? err : `Server running on port ${PORT}`);
})
