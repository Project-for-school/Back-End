const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      require: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
    assignments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignments",
      },
    ],
  },
  { collection: "Subject" },
  { timestamps: true }
);

const subjectModel = mongoose.model("Subject", subjectSchema);

module.exports = subjectModel;
