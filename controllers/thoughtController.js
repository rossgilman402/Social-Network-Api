const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  //Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Get one thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Post to create thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      //Add to associated users thought array
      if (thought.user) {
        //Find user thought current thought user id
        const user = await User.findById(thought.user);
        if (user) {
          user.thoughts.push(thought._id);
          await user.save();
        }
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Put to update the thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndRemove(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      //Remove from user if it is in user list
      if (thought.user) {
        const user = await User.findById(thought.user);
        if (user) {
          const thoughtIndex = user.thoughts.indexOf(thought._id);
          if (thoughtIndex !== -1) {
            user.thoughts.splice(thoughtIndex, 1);
            await user.save();
          }
        }
      }

      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
