const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

dotenv.config();
const app = express();

app.use(passport.initialize());

app.use(cors({
  origin: process.env.FRONTEND_SERVER
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/", todoRoutes);

const PORT = 9000;
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
  })