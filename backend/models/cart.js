const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "item",
    },
  ],
  // total price
  totalPrice:{type:Number},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
module.exports = mongoose.model("cart", cartSchema);
