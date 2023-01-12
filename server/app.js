const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_ADDRESS
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
  })