const { topicModel, subjectModel } = require("../models/");

const topicController = {
  getAllTopics: async (req, res) => {
    try {
      const topic = await topicModel.find();
      res.status(200).json(topic);
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },
  getTopic: async (req, res) => {
    try {
      const findTopic = await topicModel
        .findById(req.params.id)
        .populate("subjects");
      res.status(200).json(findTopic);
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },
  postTopic: async (req, res) => {
    try {
      const savedTopic = new topicModel(req.body);
      const topic = await savedTopic.save();
      res.status(200).json(topic);
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },
  repairTopic: async (req, res) => {
    try {
      await topicModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
      res.status(200).json("Repair Success");
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },
  deleteTopic: async (req, res) => {
    try {
      await subjectModel.updateMany(
        { subjects: req.params.id },
        { subjects: null }
      );
      await topicModel.findByIdAndDelete({
        _id: req.params.id,
      });
      res.status(200).json("Delete Success");
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },
};

module.exports = topicController;
