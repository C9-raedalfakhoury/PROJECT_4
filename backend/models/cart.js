const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },

  quantity: { type: Number, default: 1 },
  totalPrice: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
module.exports = mongoose.model("cart", cartSchema);
