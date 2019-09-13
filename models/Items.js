const mongoose = require("mongoose");
//TODO
const itemsSchema = new mongoose.Schema({
  items: []
});
const Items = mongoose.model("Items", itemsSchema);

module.exports = Items;
