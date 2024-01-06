const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  quantity: { type: String },
});
module.exports = mongoose.model("cart", cartSchema);
