const { globalModel } = require("../models/");

const globalController = {
  getAllData: async (req, res) => {
    try {
      const data = await globalModel.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getData: async (req, res) => {
    try {
      const findData = globalModel.findById(req.params.id);
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
      const newPost = new globalModel({
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
      await globalModel.findByIdAndUpdate({ _id: req.params.id }, repairData);
      res.status(200).json("Repair Success");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteData: async (req, res) => {
    try {
      const findData = globalModel.findByIdAndDelete({ _id: req.params.id });
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
