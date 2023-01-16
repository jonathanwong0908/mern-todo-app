const express = require("express");
const todoController = require("../controllers/todo");
const authorizeUser = require("../controllers/auth").authorizeUser;

const router = express.Router();

router.get("/todos", authorizeUser, todoController.getTodos);

module.exports = router;