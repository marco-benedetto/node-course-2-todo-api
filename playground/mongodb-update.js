// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb'); //it creates a variable MongoClient equals to MongoClient property
 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b83c77b155de46bec1b2179')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log(err);
    // });

    db.collection('Users').findOneAndUpdate({
        name: "Marco"
    }, {
        $set: {
            name: 'Eva'
        },
        $inc: { 
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
        }, (err) => {
        console.log(err);
    });

    //client.close(); //it closes the connection to mongo db
});