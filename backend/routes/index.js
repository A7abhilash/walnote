const express = require("../node_modules/express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("./../middleware/auth");

const Users = require("./../models/Users");

//Add ensureAuth whenever u wanna check whether the user is authenticated or not...

//@router     GET /index
//@desc       Welcome Homepage
router.get("/", ensureGuest, (req, res) => {
  // res.render("homepage");
  res.redirect(`${process.env.FRONTEND_URL}/`);
});

//@router     GET /dashboard
//@desc       Open Dashboard when succesfully logged In
router.get("/dashboard", ensureAuth, (req, res) => {
  // res.render("dashboard", {
  //   name: req.user.displayName,
  //   image: req.user.image,
  // });
  console.log(req.user);
  res.redirect(`${process.env.FRONTEND_URL}/`);
});

router.get("/user", async (req, res) => {
  // console.log(req.user);
  try {
    if (req.user) {
      let user = await Users.findOne({ userId: req.user.userId });
      return res.json(user);
    }
    res.json(null);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
