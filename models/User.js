const { Schema, model } = require("mongoose");

//Schema for User
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
      },
      message: "Invalid Email Address",
    },
  },
  //Reference to Thoughts
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  //Self reference for User to User
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

//Create virtual for friend count
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//Create User Model
const User = model("User", userSchema);

module.exports = User;
