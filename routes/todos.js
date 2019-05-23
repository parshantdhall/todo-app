const express = require('express'),
      router = express.Router();

// Importing models
const db = require('../models');

// Requiring helpers
const helpers = require('../helpers/todos');

// Getting todos Routes And Todo Post routes
router.route('/')
.get(helpers.getTodos)
.post(helpers.createTodo)
 
// Getting Single todo, update Todo, delete Todo
router.route('/:todoId')
.get(helpers.getTodo)
.put(helpers.updateTodo)
.delete(helpers.deleteTodo)

module.exports = router;