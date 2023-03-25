const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    item: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true },
  { collection: "Course" }
);

const exploreSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    course: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true },
  { collection: "Explore" }
);

const exploreModel = mongoose.model("Explore", exploreSchema);
const courseModel = mongoose.model("Course", courseSchema);

module.exports = { exploreModel, courseModel };
