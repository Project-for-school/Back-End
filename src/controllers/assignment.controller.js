const assignmentModel = require("../models/assignment");
const subjectModel = require("../models/subject");

const assignmentController = {
  getAllAssignment: async (req, res) => {
    try {
      const assignments = await assignmentModel.find();
      res.status(200).json(assignments);
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },

  getAssignment: async (req, res) => {
    try {
      const findAssignment = await assignmentModel
        .findById(req.params.id)
        .populate("subject");
      res.status(200).json(findAssignment);
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },

  postAssignment: async (req, res) => {
    try {
      const assignment = new assignmentModel(req.body);
      const newAssignment = await assignment.save();
      if (req.body.subject) {
        const subject = await subjectModel.findById(req.body.subject);
        await subject.updateOne({ $push: { assignments: newAssignment._id } });
      }
      res.status(200).json(newAssignment);
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },

  repairAssignment: async (req, res) => {
    try {
      const assignment = await assignmentModel.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (req.body.subject) {
        const subject = await subjectModel.findById(req.body.subject);
        await subject.updateOne({ $push: { assignments: assignment._id } });
      }
      res.status(200).json("Repair Success");
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },

  deleteAssignment: async (req, res) => {
    try {
      await subjectModel.updateMany(
        { assignments: req.params.id },
        {
          $pull: { assignments: req.params.id },
        }
      );
      await assignmentModel.findByIdAndDelete({
        _id: req.params.id,
      });
      res.status(200).json("Delete Success");
    } catch (err) {
      res.status(500).json("err: ", err);
    }
  },
};

module.exports = assignmentController;
