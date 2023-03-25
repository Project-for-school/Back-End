const Global = require("../models/global");

const globalController = {
  getAllData: async (req, res) => {
    try {
      const data = await Global.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getData: async (req, res) => {
    try {
      const findData = Global.findById(req.params.id);
      if (findData) {
        res.status(200).json(findData);
      } else {
        res.status(404).json("Invalid ID");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  postData: async (req, res) => {
    try {
      const newPost = new Global({
        title: req.body.title,
        description: req.body.description,
      });
      const global = await newPost.save();
      res.status(200).json(global);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  repairData: async (req, res) => {
    try {
      const repairData = {
        title: req.body.title,
        description: req.body.description,
      };
      await Global.findByIdAndUpdate({ _id: req.params.id }, repairData);
      res.status(200).json("Repair Success");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteData: async (req, res) => {
    try {
      const findData = Global.findByIdAndDelete({ _id: req.params.id });
      if (findData) {
        res.status(200).json("Delete Success");
      } else {
        res.status(404).json("Invalid Id");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = globalController;
