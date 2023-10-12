const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId)
        .populate('reactions.reactedBy', 'username'); // Populate the 'reactedBy' field with 'username'

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const { thoughtText, username, userId } = req.body;

      const newThought = await Thought.create({ thoughtText, createdBy: userId });

      // Push the created thought's _id to the associated user's thoughts array field
      await User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } });

      res.status(201).json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndRemove(req.params.thoughtId);

      if (!deletedThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      // Remove the thought's _id from the associated user's thoughts array field
      await User.findByIdAndUpdate(deletedThought.createdBy, { $pull: { thoughts: deletedThought._id } });

      res.json({ message: 'Thought deleted successfully', deletedThought });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const { reactionText, reactedBy } = req.body;

      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: { reactionText, reactedBy } } },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.status(201).json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
