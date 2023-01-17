const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const passport = require("passport");

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.find({ username });
    if (user) return res.status(401);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    delete newUser.password;
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User does not exist" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.authorizeUser = (req, res, next) => {
  passport.authenticate("jwt", { session: false });
  let token = req.headers.authorization;
  token = token.replace("Bearer ", "");
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  if (!verify) return res.status(401).json({ message: "Not authorized" });
  req.user = verify.username;
  next();
}