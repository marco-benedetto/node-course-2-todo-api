var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// var newTodo = new Todo({
//     text: 'Cook dinner',
// });

// newTodo.save().then((doc)=> {
//     console.log('Save todo', doc);
// }, (err) => {
//     console.log('Unable to save', err);
// });

// var myTodo = new Todo({
//     text: 'Have dinner',
//     completed: false,
//     completedAt: 123456
// });

// myTodo.save().then((doc) => {
//     console.log('Save todo', doc);
// }, (err) => {
//     console.log('Unable to save', err);
// });

// var newUser = new User({
//     email: 'test@gmail.com'
// });

// newUser.save().then((doc) => {
//     console.log('New user successfully added', JSON.stringify(doc, undefined, 2));
// }, (err) => {
//     console.log('Unable to add new user', err);
// });

var app = express();

//configuring the middleware
app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};