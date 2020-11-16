const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

//DB CONFIG
connectDB();

//MIDDLEWARES
//Body PArser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.use("/lists", require("./routes/lists"));
app.use("/notes", require("./routes/notes"));
app.use("/user", require("./routes/user"));

//PORT
app.listen(7781, () => {
  console.log("Server Started");
});
