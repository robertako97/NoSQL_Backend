const User = require('../models/User');
const Thought = require('../models/Thought'); 

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.userId)
      

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndRemove(req.params.userId);

      if (!deletedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      // Bonus: Remove user's associated thoughts
      await Thought.deleteMany({ createdBy: req.params.userId });

      res.json({ message: 'User deleted successfully', deletedUser });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      const friend = await User.findById(req.params.friendId);

      if (!user || !friend) {
        return res.status(404).json({ message: 'User or friend not found' });
      }

      user.friends.push(req.params.friendId);
      await user.save();

      res.json({ message: 'Friend added successfully', user });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const user = await User.findById(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.friends.pull(req.params.friendId);
      await user.save();

      res.json({ message: 'Friend removed successfully', user });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
