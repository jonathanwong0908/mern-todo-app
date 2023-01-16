const Todo = require("../models/Todo");
const User = require("../models/User");

exports.getTodos = async (req, res) => {
  const username = req.user;
  const user = await User.findOne({ username });
  if (!user.todos.length) return res.json([]);
  await user.populate("todos");
  const todos = user.todos.map(todoObject => {
    return { todo: todoObject.todo, id: todoObject._id };
  });
  res.json(todos);
}

exports.postTodos = async (req, res) => {
  const username = req.user;
  const todo = req.body.todo;
  const user = await User.findOne({ username });
  const newTodo = new Todo({ userId: user.id, todo });
  await newTodo.save();
  user.todos = [newTodo.id, ...user.todos];
  await user.save();
  await user.populate("todos");
  const todos = user.todos.map(todoObject => {
    return { todo: todoObject.todo, id: todoObject._id };
  });
  res.json(todos);
}

exports.updateTodo = async (req, res) => {
  const username = req.user;
  const todoId = req.body.todoId;
  const updatedTodo = req.body.todo;
  const todo = await Todo.findById(todoId);
  todo.todo = updatedTodo;
  await todo.save();
  const user = await User.findOne({ username });
  await user.populate("todos");
  const todos = user.todos.map(todoObject => {
    return { todo: todoObject.todo, id: todoObject._id };
  });
  res.json(todos);
}

exports.deleteTodo = async (req, res) => {
  const username = req.user;
  const currentTodoId = req.body.todoId;
  console.log(req.body);
  await Todo.deleteOne({ id: currentTodoId });
  const user = await User.findOne({ username });
  user.todos = user.todos.filter(todoId => todoId.toString() !== currentTodoId);
  await user.save();
  const todos = user.todos.map(todoObject => {
    return { todo: todoObject.todo, id: todoObject._id };
  });
  console.log(todos);
  res.json(todos);
}