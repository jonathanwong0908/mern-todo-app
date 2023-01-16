const Todo = require("../models/Todo");
const User = require("../models/User");

exports.getTodos = async (req, res) => {
  const username = req.user;
  const user = await User.findOne({ username });
  if (!user.todos.length) return res.json([]);
  await user.populate("todos");
  const todos = user.todos.map(todoObject => todoObject.todo);
  res.json(todos);
}

exports.postTodos = async (req, res) => {
  console.log(req.user, req.body);
  const username = req.user;
  const todo = req.body.todo;
  const user = await User.findOne({ username });
  const newTodo = new Todo({ userId: user.id, todo });
  await newTodo.save();
  user.todos = [newTodo.id, ...user.todos];
  await user.save();
  await user.populate("todos");
  const todos = user.todos.map(todoObject => todoObject.todo);
  res.json(todos);
}