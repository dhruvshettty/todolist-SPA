/*
The first file mongoose by default
reads in the models directory
*/

var mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/todo-api'
mongoose.set('debug', true);
mongoose.connect(url, { useNewUrlParser: true});

const db = mongoose.connection;
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

mongoose.Promise = Promise;	// Used to Chain content

module.exports.Todo = require('./todo');