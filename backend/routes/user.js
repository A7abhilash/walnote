const express = require("express");
const router = express.Router();

const Notes = require("./../models/Notes");
const Lists = require("./../models/Lists");

//@route   DELETE /user/:userId
//@desc     Delete an user account and their data
router.delete("/:id", async (req, res) => {
  try {
    let notes = await Notes.deleteMany({ userId: req.params.id });
    let lists = await Lists.deleteMany({ userId: req.params.id });
    // console.log(deletedCount);
    if (lists.ok && notes.ok) {
      return res.json({ msg: "success" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
