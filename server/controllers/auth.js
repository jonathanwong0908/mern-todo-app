const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.find({ username });
    if (user) {
      res.status(401);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    console.log(newUser);
    await newUser.save();
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.find({ username });
    if (!user) {
      res.status(401);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
    }
    const payload = {
      id: user.id,
      username: user.username
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}