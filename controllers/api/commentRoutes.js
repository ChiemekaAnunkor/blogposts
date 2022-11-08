const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const commentData = await Comment.findAll({
      include: [{ model: User }, { model: Blog }],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const commentData = await Comment.create(req.body);

    console.log(commentData);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
