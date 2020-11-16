const express = require("express");
const router = express.Router();
var CryptoJS = require("crypto-js");

const Notes = require("./../models/Notes");

//@route    GET /notes/:id
//@desc     Get all the notes of userId :id
router.get("/:id", async (req, res) => {
  try {
    const allData = [];
    const allNotes = await Notes.find({ userId: req.params.id });
    allNotes.forEach((note) => {
      const decryptedData = CryptoJS.AES.decrypt(note.data, "Secret key 123");
      const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
      data["_id"] = note._id;
      allData.push(data);
    });
    res.json(allData);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//@route    POST /notes
//@desc     Add new note
router.post("/", async (req, res) => {
  let note = {
    noteName: req.body.noteName,
    note: req.body.note,
    userId: req.body.userId,
  };
  try {
    let encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(note),
      "Secret key 123"
    ).toString();
    let data = new Notes({ data: encryptedData, userId: req.body.userId });
    let response = await data.save();
    note["_id"] = response._id;
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//@route    PATCH /notes/:id
//@desc     Edit NOTE
router.patch("/:id", async (req, res) => {
  try {
    const note = await Notes.findByIdAndUpdate(req.params.id);
    const decryptedData = CryptoJS.AES.decrypt(note.data, "Secret key 123");
    const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));

    data.noteName = req.body.noteName;
    data.note = req.body.note;
    data._id = req.params.id;
    try {
      let encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        "Secret key 123"
      ).toString();
      note.data = encryptedData;
      await note.save();
      const allData = [];
      const allNotes = await Notes.find({ userId: data.userId });
      allNotes.forEach((note) => {
        const decryptedData = CryptoJS.AES.decrypt(note.data, "Secret key 123");
        const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
        data["_id"] = note._id;
        allData.push(data);
      });
      res.status(201).json({ updatedNote: data, allNotes: allData });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

//@route    DELETE /notes/:id
//@desc     Delete a NOTE
router.delete("/:id", async (req, res) => {
  try {
    await Notes.findByIdAndDelete(req.params.id);
    res.status(201).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
