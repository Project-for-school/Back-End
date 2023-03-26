const { subjectModel, topicModel, assignmentModel } = require("../models");

const subjectController = {
  getAllSubjects: async (req, res) => {
    try {
      const subject = await subjectModel.find();
      res.status(200).json(subject);
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },

  getSubject: async (req, res) => {
    try {
      const findSubject = await subjectModel
        .findById(req.params.id)
        .populate("topic");
      res.status(200).json(findSubject);
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },

  postSubject: async (req, res) => {
    try {
      const subject = new subjectModel(req.body);
      const savedSubject = await subject.save();
      if (req.body.topic) {
        const topic = await topicModel.findById(req.body.topic);
        await topic.updateOne({ $push: { subjects: savedSubject._id } });
      }
      res.status(200).json(savedSubject);
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },

  repairSubject: async (req, res) => {
    try {
      const subject = await subjectModel.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (req.body.topic) {
        const topic = await topicModel.findById(req.body.topic);
        await topic.updateOne({ $push: { subjects: subject._id } });
      }
      res.status(200).json("Repair Success");
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },

  deleteSubject: async (req, res) => {
    try {
      await topicModel.updateMany(
        { subjects: req.params.id },
        { $pull: { subjects: req.params.id } }
      );
      await assignmentModel.updateMany(
        { subject: req.params.id },
        { subject: null }
      );
      await subjectModel.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json("Delete Success");
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },
};

module.exports = subjectController;
