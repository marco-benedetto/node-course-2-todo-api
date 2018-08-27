// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb'); //it creates a variable MongoClient equals to MongoClient property
 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    //this fetches all todos, find returns a db cursor which isn't the document in itself
    //toArray returns a promise
    db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch data', err);
    }); 

    db.collection('Todos').find({completed: false}).toArray().then((docs) => {
        console.log('Todos - Not yet completed');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fecth data', data);
    });

    db.collection('Todos').find({
        _id: new ObjectID('5b83b06109ad520a390600bf')
    }).toArray().then((docs) => {
        console.log('Todos - Query by id');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch data', data);
    });

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    db.collection('Users').find({
        name: "Andrew"
    }).toArray().then((docs) => {
        console.log('Todos - Query by name "Andrew"');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    //client.close(); //it closes the connection to mongo db
});