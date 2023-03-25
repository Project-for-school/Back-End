const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    solution: {
      type: Boolean,
      default: false,
    },
    difficult: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      require: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true },
  { collection: "Product" }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
