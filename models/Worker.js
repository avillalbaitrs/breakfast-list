const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name: {
    type: String
  },
  date: {
    type: Date,
    unique: true
  }
});
const Worker = mongoose.model("Worker", workerSchema);
module.exports = Worker;
