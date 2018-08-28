const expect = require('expect');
const request = require('request');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
    Todo.remove({}) //we pass an empty object to wipe the db
        .then(() => {
            done();
        });
}); //we set database 

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
                Todo.find()
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
                        expext(todos.length).toBe(0); //We assumed that the database is empty on each run
                        done();
                    })
                    .catch((err) => done(err)); //fetch everything in the collection
            });
    });
});