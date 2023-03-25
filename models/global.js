const mongoose = require("mongoose");

const globalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { collection: "Global" }
);

const globalModel = mongoose.model("global", globalSchema);

module.exports = globalModel;
