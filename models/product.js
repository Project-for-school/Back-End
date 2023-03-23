const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    solution: {
      type: Boolean,
      require: true,
      default: false,
    },
    difficult: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
