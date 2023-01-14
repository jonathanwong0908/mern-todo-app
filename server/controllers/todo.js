const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  console.log(req.header.authorization);
  res.sendStatus(200);
}