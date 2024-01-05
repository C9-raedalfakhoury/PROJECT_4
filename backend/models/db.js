require("dotenv").config()
const mongoose = require("mongoose");
// connecting to mongodb
mongoose.connect(process.env.DB).then(
  () => {
    console.log("DB Ready To Use");
  },
  (err) => {
    console.log(err);
  }
);
