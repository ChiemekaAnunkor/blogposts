const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User }, { model: Comment }],
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }],
    });
    if (!blogData) {
      res.status(404).json({ message: "No user with this id!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category

  console.log(req.body);
  const moment = require("moment");

  const time = moment().format();
  let [netime] = time.split("T");
  console.log(netime);

  const { title, blog_content, user_id } = req.body;
  const newob = {
    createdAt: netime,
    title: title,
    blog_content: blog_content,
    user_id: user_id,
  };
  try {
    const blogData = await Blog.create(newob);

    console.log(blogData);
    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.put("/:id", async (req, res) => {
//   // update a category by its `id` value
//   try {
//     const cetegorydata = await Category.update(req.body, {
//       where: { id: req.params.id },
//     });
//     if (!cetegorydata[0]) {
//       res.status(404).json({ message: "No user with this id!" });
//       return;
//     }
//     res.status(200).json(cetegorydata);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.delete("/:id", async (req, res) => {
//   // delete a category by its `id` value
//   try {
//     const categoryData = await Category.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!categoryData) {
//       res.status(404).json({ message: " No Categories found with this id" });
//     }
//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
