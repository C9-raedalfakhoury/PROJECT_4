const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  totalPrice: { type: Number },
  quantity: { type: Number },
  orderStatus: { type: String, default: "Appending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
});
module.exports = mongoose.model("order", orderSchema);