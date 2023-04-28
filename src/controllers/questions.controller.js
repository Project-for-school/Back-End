const questionModel = require("../models/question");

const questionsController = {
  getAllData: async (req, res) => {
    try {
      const dataQuestions = await questionModel.find();
      res.status(200).json(dataQuestions);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getData: async (req, res) => {
    try {
      const dataQuestion = await questionModel.findById(req.params.id);
      res.status(200).json(dataQuestion);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  postQuestion: async (req, res) => {
    try {
      const newQuestion = new questionModel(req.body);
      const saveQuestion = await newQuestion.save();
      res.status(200).json(saveQuestion);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteQuestion: async (req, res) => {
    try {
      await questionModel.findByIdAndRemove({ _id: req.params.id });
      res.status(200).json("Remove Success !");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  repairQuestion: async (req, res) => {
    try {
      await questionModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
      res.status(200).json("Repair Success !");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = questionsController;
