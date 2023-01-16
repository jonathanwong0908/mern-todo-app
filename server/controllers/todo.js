const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");

exports.getTodos = async (req, res) => {
  console.log(req.user);
  res.json(["todo1", "todo2", "todo3"]);
}