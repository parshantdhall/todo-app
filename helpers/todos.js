const db = require('../models');

exports.getTodos = (req, res) => {
  db.Todo.find({})
  .then(todos => {
    res.json(todos);
  })
  .catch(err => {console.log(err);});
}

exports.createTodo = (req, res) => {
  let name = req.body.name;
  db.Todo.create({name: name})
  .then(todo => {
    res.status(201).json(todo);
  })
  .catch(err => {console.log(err);});
}

exports.getTodo = (req, res) => {
  let todoId = req.params.todoId;
  db.Todo.findById(todoId)
  .then((todo) => {
    res.json(todo);
  })
  .catch(err => {
    console.log(err);
  });
}

exports.updateTodo = (req, res) => {
  let todoId = req.params.todoId;
  db.Todo.findByIdAndUpdate(todoId, req.body.name, {new: true})
  .then(todo => {
    res.json(todo);
  })
  .catch(err => {
    console.log(err);
  });
}

exports.deleteTodo = (req, res) => {
  let todoId = req.params.todoId;
  db.Todo.findByIdAndDelete(todoId)
  .then(()=> {
    res.json({message: "Deletion successful"});
  })
  .catch(err => {
    console.log(err);
  });
}


module.exports = exports;