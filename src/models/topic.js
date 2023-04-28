const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      require: true,
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
  },
  { timestamps: true },
  { collection: "Topic" }
);

const topicModel = mongoose.model("Topic", topicSchema);

module.exports = topicModel;
