// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb'); //it creates a variable MongoClient equals to MongoClient property
 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    //deleteMany, deletes many documents in the collection
    // db.collection('Todos').deleteMany({
    //     text: 'Eat lunch'
    // }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log(err);
    // });

    //deleteOne, acts the same as deleteMany but if more than one document fulfill the same criteria only the first one will be deleted
    // db.collection('Todos').deleteOne({
    //     text: 'Eat lunch'
    // }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log(err);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({
    //     completed: false
    // }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log(err);
    // });

    db.collection('Users').deleteMany({
        name: 'Andrew'
    }).then((result) => {
        console.log(result);
    }, (err) => {
        console.log(result);
    });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5b83be07155de46bec1b1e16')
    }).then((result) => {
        console.log(result);
    }, (err) => {
        console.log(JSON.stringify(result, undefined, 2));
    });

    //client.close(); //it closes the connection to mongo db
});