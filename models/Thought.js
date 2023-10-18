const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    //Format the timestamp
    get: (timestamp) => timestamp.toLocaleString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

//Create virtual to get reactionSchema count
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//Create Model
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
