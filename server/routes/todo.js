const express = require("express");
const todoController = require("../controllers/todo");

const router = express.Router();

router.get("/todos", todoController.getTodos);

module.exports = router;