const expect = require('expect');
const request = require('request');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}];

// beforeEach((done) => {
//     Todo.remove({}) //we pass an empty object to wipe the db
//         .then(() => {
//             done();
//         });
// }); //we set database 

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    //First test: send a valid post request and everything should go as expected
    it('Should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('localhost:3000/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err); //Test fails
                }
                Todo.find({text})
                    .then((todos) => {
                        expext(todos.length).toBe(1); //We assumed that the database is empty on each run
                        expect(todos[0].text).toBe(text);
                        done();
                    })
                    .catch((err) => done(err)); //fetch everything in the collection
            });
    });

    it('Should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find()
                    .then((todos) => {
                        expext(todos.length).toBe(2); //We assumed that the database is empty on each run
                        done();
                    })
                    .catch((err) => done(err)); //fetch everything in the collection
            });
    });
});

describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app).get('/todos').expect(200).expect((res) => {
            expect(res.body.todos.length).toBe(2);
        }).end(done);
    });
});

describe('GET /todos/:id', () => {
    it('Should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            }).end(done);
    });

    it('Should return a 404 if todo not found', (done) => {
        var newID = new ObjectID();
        request(app)
            .get(`/todos/${newID.toHexString()}`)
            .expect(404).end(done);
    });

    it('Should return a 404 for non-object ids', (done) => {
        var fakeID = '123456';
        request(app).get(`/todos/${fakeID}`).expect(404).end(done);
    })
});