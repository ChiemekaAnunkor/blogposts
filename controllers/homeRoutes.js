const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Prevent non logged in users from viewing the homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
    });
    const postData = await Blog.findAll({});

    const blogs = postData.map((blog) => blog.get({ plain: true }));
    console.log(blogs);

    const users = userData.map((project) => project.get({ plain: true }));

    res.render("homepage", {
      // layout: 'dashboard',
      blogs,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
