const express = require("express");
const todoController = require("../controllers/todo");
const authorizeUser = require("../controllers/auth").authorizeUser;

const router = express.Router();

router.get("/todos", authorizeUser, todoController.getTodos);

router.post("/todos", authorizeUser, todoController.postTodos);

router.put("/todos", authorizeUser, todoController.updateTodo);

router.delete("/todos", authorizeUser, todoController.deleteTodo);

module.exports = router;