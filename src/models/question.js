const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      require: true,
    },
    answer: {
      type: String,
      require: true,
    },
  },
  { collection: "Questions" }
);

const questionModel = mongoose.model("Question", questionSchema)
module.exports = questionModel
