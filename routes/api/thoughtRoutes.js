const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  //   addFriend,
  //   deleteFriend,
} = require("../../controllers/thoughtController.js");

//api/thoughts/
router.route("/").get(getThoughts).post(createThought);

//api/thoughts/:userId
router
  .route("/:userId")
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);

module.exports = router;
