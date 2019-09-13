const express = require("express");
const app = express();
const connectDB = require("./db");
const bodyParser = require("body-parser");

// Models
const Worker = require("./models/Worker");

app.use(bodyParser.json()); // to support JSON-encoded bodies

connectDB();

// Routes

// @route   GET /workers
// @desc    Get all workers
app.get("/workers", async (req, res) => {
  try {
    const workers = await Worker.find().sort({ date: 1 });
    res.json(workers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /worker
// @desc    Add a new worker to the schedule
app.post("/worker", async (req, res) => {
  const { name, date } = req.body;

  const worker = new Worker({
    name,
    date
  });

  try {
    await worker.save();
  } catch (error) {
    console.error(error);
  }
});

// @route   DELETE /worker
// @desc    Remove a new worker from the schedule
app.delete("/worker/:id", async (req, res) => {
  try {
    await Worker.deleteOne({ _id: req.params.id });
  } catch (error) {
    console.error("Error / ", error);
  }
});

//
app.listen(5000, () => {
  console.log("Example app listening on port 3000!");
});
