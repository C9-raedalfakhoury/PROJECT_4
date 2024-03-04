const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "cart" }],
  totalPrice: { type: Number }, 
  orderStatus: { type: String, default: "Pending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, 
});
module.exports = mongoose.model("order", orderSchema);