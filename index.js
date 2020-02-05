const express = require('express');
const app = express();
const connectDB = require('./db');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5050;

connectDB();

// Models
const Worker = require('./models/Worker');
const Items = require('./models/Items');

app.use(bodyParser.json()); // to support JSON-encoded bodies

// Routes

// @route   GET /workers
// @desc    Get all workers
app.get('/workers', async (req, res) => {
  try {
    const workers = await Worker.find().sort({ date: 1 });
    res.json(workers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /worker
// @desc    Add a new worker to the schedule
app.post('/worker', async (req, res) => {
  const { name, date } = req.body;

  const worker = new Worker({
    name,
    date,
  });

  try {
    await worker.save();
  } catch (error) {
    console.error(error);
  }
});

// @route   DELETE /worker
// @desc    Remove a new worker from the schedule
app.delete('/worker/:id', async (req, res) => {
  try {
    await Worker.deleteOne({ _id: req.params.id });
  } catch (error) {
    console.error('Error / ', error);
  }
});

// @route   GET /items
// @desc    Get all items
app.get('/items', async (req, res) => {
  try {
    const items = await Items.find();
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server_Error');
  }
});

// @route   POST /item
// @desc    Add a new item to the fridge
app.post('/item', async (req, res) => {
  const { name } = req.body;
  const item = new Items({
    name,
  });

  try {
    await item.save();
  } catch (error) {
    console.error(error);
  }
});

// @route   DELETE /item
// @desc    Remove an item from the fridge
app.delete('/item/:id', async (req, res) => {
  try {
    await Items.deleteOne({ _id: req.params.id });
  } catch (error) {
    console.error('Error / ', error);
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//
app.listen(port, () => {
  console.log('Running!');
});
