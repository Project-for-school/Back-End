const mongoose = require("mongoose");

const assignmentsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
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
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  },
  { timestamps: true },
  { collection: "Assignments" }
);

const assignmentsModel = mongoose.model("Assignments", assignmentsSchema);

module.exports = assignmentsModel;
