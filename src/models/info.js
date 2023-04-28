const mongoose = require("mongoose");

const infoScheme = new mongoose.Schema(
  {
    frameword: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { collection: "Info" }
);

const infoModel = mongoose.model("Info", infoScheme);

module.exports = infoModel;
