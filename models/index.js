// var mongoose = require('mongoose');
// mongoose.set('debug', true);
// mongoose.connect('mongodb://localhost/todo-api');

var mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/todo-api'
mongoose.set('debug', true);
mongoose.connect(url, { useNewUrlParser: true});

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");