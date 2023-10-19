const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  //Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate("friends").populate("thoughts");
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Get one user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate({ path: "thoughts", select: "-_v" });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Create User
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }
      );
      //Do I need save?
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      //Delete Thoughts that go with the user
      await Thought.deleteMany({ user: req.params.userId });

      res.json({ message: "Student successfully deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Add new friend
  async addFriend(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      const friend = await User.findById(req.params.friendId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!friend) {
        return res.status(404).json({ message: "Friend not found" });
      }

      if (!user.friends.includes(req.params.friendId)) {
        user.friends.push(req.params.friendId);
        await user.save();
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Delete a friend
  async deleteFriend(req, res) {
    try {
      const user = await User.findById(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const friendIndex = user.friends.indexOf(req.params.friendId);

      if (friendIndex === -1) {
        return res.status(404).json({ message: "Friend not found" });
      }

      user.friends.splice(friendIndex, 1);
      await user.save();

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
