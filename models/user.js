const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      minlength: 6,
      maxlength: 20,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      minlength: 10,
      maxlength: 50,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
  { collection: "Users" }
);

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
