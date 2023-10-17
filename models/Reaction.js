const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId(),
    default: new Schema.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    //Format the timestamp
    get: (timestamp) => timestamp.toLocaleString(),
  },
});

// Sub array?
module.exports = reactionSchema;
