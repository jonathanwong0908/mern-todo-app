const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}