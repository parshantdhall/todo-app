const db = require('../models');

exports.getTodos = (req, res) => {
  db.Todo.find({})
  .then(todos => {
    res.json(todos);
  })
  .catch(err => {console.log(err);});
}

exports.createTodo = (req, res) => {
  let body = req.body;
  db.Todo.create({name: body.name})
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
  db.Todo.findOneAndUpdate({_id: todoId}, req.body, {new: true})
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