const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  imageUrl: [
    {
      type: String,
      required: true,
    },
  ],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" ,required:true},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
});
module.exports = mongoose.model("products", productSchema);
