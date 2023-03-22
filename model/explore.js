const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  chapters: {
    type: Number,
    require: true,
    default: 1,
  },
  item: {
    type: Number,
    require: true,
    default: 1,
  },
});

const exploreSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const exploreModel = mongoose.model("Explore", exploreSchema);
const courseModel = mongoose.model("Course", courseSchema);

module.exports = { exploreModel, courseModel };
