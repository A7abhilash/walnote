const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Lists", ListSchema);
