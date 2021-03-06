const express = require('express');
const utils = require('./utils/task-schema');

const app = express();

app.use(express.json());

const tasks = [{
    id: 1,
    name: 'Task 1',
    completed: false
}, {
    id: 2,
    name: 'Task 2',
    completed: false
}, {
    id: 3,
    name: 'Task 3',
    completed: false
}];

//GET
app.get('/api/tasks/', (req, res) => {
    res.send(tasks);
});

//GET by Id
app.get('/api/task/:id', (req, res) => {
    const taskId = req.params.id;

    const task = tasks.find(({id}) => id === parseInt(taskId));

    if (!task) {
        return res.status(404).send('The task does not exist with the task id provided');
    }

    res.send(task)
});

// POST
app.post('/api/tasks/', (req, res) => {
    const {error} = utils.validateTask(req.body);

    if (error) {
        return res.status(404).send('The name should be at least 3 characters');
    }

    const task = {
        id: tasks.length + 1,
        name: req.body.name,
        completed: req.body.completed
    };

    tasks.push(task);

    res.send(tasks);
});

// PUT
app.put('/api/task/:id', (req, res) => {
    const taskId = req.params.id;

    const task = tasks.find(({id}) => id === taskId);

    if (!task) {
        return res.status(404).send('The task does not exist with the task id provided');
    }

    const {error} = utils.validateTask(task);

    if (error) {
        return res.status(400).send('The name should be atleast 3 characters');
    }

    task.name = req.body.name;
    task.completed = req.body.completed;

    res.send(task);
});

// PATCH
app.patch('/api/task/:id', (req, res) => {
    const taskId = req.params.id;

    const task = tasks.find(({id}) => id === taskId);

    if (!task) {
        return res.status(404).send('The task does not exist with the task id provided');
    }

    const {error} = utils.validateTask(task);

    if (error) {
        return res.status(400).send('The name should be atleast 3 characters');
    }

    task.name = req.body.name;

    if (req.body.completed) {
        task.completed = req.body.completed;
    }

    res.send(task);
});

// DELETE
app.delete('/api/task/:id', (req, res) => {
    const taskId = req.params.id;

    const task = tasks.find(({id}) => id === taskId);

    if (!task) {
        return res.status(404).send('The task does not exist with the task id provided');
    }

    const idx = tasks.indexOf(task);

    tasks.splice(idx, 1);

    res.send(tasks);
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => `Listening on port http://localhost:${PORT}`);