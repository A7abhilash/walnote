const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Notes", NotesSchema);
