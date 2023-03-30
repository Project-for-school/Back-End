const mongoose = require("mongoose");

const premiumSchema = new mongoose.Schema(
  {
    package: {
      type: String,
      require: true,
    },
    oldPrice: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { collection: "Premium" }
);

const premiumModel = mongoose.model("Premium", premiumSchema);

module.exports = premiumModel;
