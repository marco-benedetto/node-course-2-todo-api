// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb'); //it creates a variable MongoClient equals to MongoClient property

var obj = new ObjectID(); //it gives the unique id of the object we just created
console.log(obj); 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to inert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // }); //it enters a record to the db

    // db.collection('Users').insertOne({
    //     name: 'Marco',
    //     age: 25,
    //     location: 'Napoli'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert a user', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    client.close(); //it closes the connection to mongo db
});