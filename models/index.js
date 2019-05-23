const mongoose = require('mongoose');
mongoose.set('debug', true); //Debugging purpose..

mongoose.connect('mongodb://localhost/todo-api', { useNewUrlParser: true });

mongoose.Promise = Promise; //Just to handle mongo db req with promises

// Exporting modules
module.exports.Todo = require('./todo');