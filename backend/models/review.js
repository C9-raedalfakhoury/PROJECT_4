const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  commenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  // rate: {            // ! "غير مكتملة"
  //   type: Number,
  //   required: true,
  // },

});
module.exports = mongoose.model("review", reviewSchema);
