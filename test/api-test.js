const request = require('request');
const sinon = require('sinon');
require('chai').should();

const getResponseTasks = require('./mock-data/get-response-task.json');
const getResponseTaskId = require('./mock-data/get-response-task-id.json');
const postResponseTask = require('./mock-data/post-response-task.json');
const putResponseTask = require('./mock-data/put-response-task.json');
const patchResponseTask = require('./mock-data/patch-response-task.json');
const deleteResponseTask = require('./mock-data/delete-response-task.json');

const getParsedResponse = res => JSON.parse(res);

describe ('API tasks', () => {

    describe('/api/tasks/ get', () => {
        before (() => {
            sinon
                .stub(request, 'get')
                .yields(null, null, JSON.stringify(getResponseTasks))
        });

        after (() => {
            sinon
                .restore();
        });

        it ('should return valid response with tasks', done => {
            request.get(
                {url: '/api/tasks/'},
                (err, res, body) => {
                    const parsedBody = getParsedResponse(body);

                    parsedBody.should.be.a('array');
                    parsedBody.should.have.lengthOf(1);
                    done();
                }
            );
        });
    });

    describe('/api/task/:id get', () => {
        before (() => {
            sinon
                .stub(request, 'get')
                .yields(null, null, JSON.stringify(getResponseTaskId));
        });

        after (() => {
            sinon.restore();
        });

        it ('should return the valid task with the valid task id provided in url', done => {
            request.get(
                {url: '/api/task/1'},
                (err, res, body) => {
                    const parsedBody = getParsedResponse(body);

                    parsedBody.should.be.a('object');
                    parsedBody.should.have.property('id');
                    parsedBody.should.have.property('name');
                    parsedBody.should.have.property('completed');

                    done();
                }
            );
        });
    });

    describe('/api/tasks/ post', () => {
        before (() => {
            sinon
                .stub(request, 'post')
                .yields(null, null, JSON.stringify(postResponseTask));
        });

        after (() => {
            sinon.restore();
        });

        it ('should return the valid tasks with one which is just added', done => {
            const requestObjectToSend = {
                id: '1',
                name: 'Task 1',
                completed: false
            };

            request.post(
                {
                    url: '/api/tasks/',
                    form: JSON.stringify(requestObjectToSend)
                },
                (err, res, body) => {
                    const parsedBody = getParsedResponse(body);

                    parsedBody.should.be.a('array');
                    parsedBody.should.have.lengthOf(1);

                    done();
                }
            );
        });
    });

    describe('/api/task/:id put', () => {
        before (() => {
            sinon
                .stub(request, 'put')
                .yields(null, null, JSON.stringify(putResponseTask));
        });

        after (() => {
            sinon.restore();
        });

        it ('should retur the updated task for the task provided in the url', done => {
            request.put(
                {url: '/api/task/1'},
                (err, res, body) => {
                    const parsedBody = getParsedResponse(body);

                    parsedBody.should.be.a('object');
                    parsedBody.should.have.property('id');
                    parsedBody.should.have.property('name');
                    parsedBody.should.have.property('completed');

                    done();
                }
            );
        });
    });

    describe ('/api/task/:id patch', () => {
        before (() => {
            sinon
                .stub(request, 'patch')
                .yields(null, null, JSON.stringify(patchResponseTask));
        });

        after (() => {
            sinon.restore();
        });

        it ('should return the updated (patched) task for the task id provided in the url', done => {
            request.patch(
                {url: '/api/task/1'},
                (err, res, body) => {
                    const parsedBody = getParsedResponse(body);

                    parsedBody.should.be.a('object');
                    parsedBody.should.have.property('id');
                    parsedBody.should.have.property('name');
                    parsedBody.should.have.property('completed');
                    done();
                }
            )
        });
    });

    describe ('/api/task/:id delete', () => {
        before (() => {
            sinon
                .stub(request, 'delete')
                .yields(null, null, JSON.stringify(deleteResponseTask));
        });

        after (() => {
            sinon.restore();
        });

        it ('should return the tasks after deleting the task for which id is provided', done => {
            request.delete(
                {url: '/api/task/1'},
                (err, res, body) => {
                    const parsedBody = getParsedResponse(body);

                    parsedBody.should.be.a('array');
                    parsedBody.should.have.lengthOf(0);
                    done();
                }
            );
        });
    });
});