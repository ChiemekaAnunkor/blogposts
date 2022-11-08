const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");

router.post("/login", async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    console.log(req.session);
    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products

  try {
    const userData = await User.findAll({
      include: [{ model: Blog }, { model: Comment }],
    });

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  if (req.session.logged_in) {
    // Remove the session variables
  }

  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Blog }, { model: Comment }],
    });
    console.log(userData.dataValues.id === req.session.user_id);
    if (!userData) {
      res.status(404).json({ message: "No user with this id!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
