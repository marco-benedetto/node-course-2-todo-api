const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

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

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(req.params.id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err) => res.status(400).send());
});

app.delete('/todo/:id', (req,res) => {
    //get the id 
    var id = req.params.id;
    //validate the id, if not valid return a 404
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    //remove todo by id
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err) => res.status(400).send());
        //success,
            //no doc? send 404
            //if yes, send doc back with 200
        //error, returns a 400 error with empty body
});

app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) { //if completed is boolean and it's true
        body.completedAt = new Date().getTime(); //getTime returns a js object containing a timestamp
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((err) => res.status(400).send());
});

app.post('/users', (req,res) => {
    var body = _.pick(res.body, ['email', 'password']);
    var user = new User(body);
    user.save().then((user) => {
        return user.generateAuthToken();
        // res.send(user);
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => res.status(400).send(err));
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};