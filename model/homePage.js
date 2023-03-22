const mongoose = require("mongoose");

const indexSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const indexModel = mongoose.model("Index", indexSchema);

module.exports = indexModel;
