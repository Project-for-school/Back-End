const mongoose = require("mongoose");

const descriptionSchema = new mongoose.Schema({
  description: {
    type: String,
    require: true,
  },
});

const infoScheme = new mongoose.Schema({
  frameword: {
    type: String,
    require: true,
    description: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Description",
    },
  },
});

const infoModel = mongoose.model("Info", infoScheme);
const descriptionModel = mongoose.model("Description", descriptionSchema);

module.exports = { infoModel, descriptionModel };
