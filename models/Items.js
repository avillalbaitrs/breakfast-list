const mongoose = require('mongoose');
//TODO
const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});
const Items = mongoose.model('Items', itemsSchema);

module.exports = Items;
