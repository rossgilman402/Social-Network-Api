const connection = require("../config/connection");
const { User, Thought } = require("../models");
const thoughtData = {
  thoughtText: "Here's a cool thought...",
  username: "lernantino",
  userId: "652f25bcaf53305bb6dba104",
};

const userData = [
  {
    username: "lernantino",
    email: "lernantino@gmail.com",
  },
  {
    username: "sauce",
    email: "sauce@gmail.com",
  },
  {
    username: "butter",
    email: "butter@gmail.com",
  },
  {
    username: "ross",
    email: "ross@gmail.com",
  },
];

// Start the seeding runtime timer
console.time("seeding");

//Create connection to mongoDB
connection.once("open", async () => {
  //Delete collections if they exist
  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  await User.collection.insertMany(userData);
  await Thought.collection.insertOne(thoughtData);

  console.table(userData);
  console.table(thoughtData);
  console.timeEnd("Seeding Complete");
  process.exit(0);
});
