const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  price: { type: Number },
  quantity: { type: Number },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
});
module.exports = mongoose.model("item", itemSchema);
