const express = require('express')
const routeListener = express.Router();
const controller = require('../controllers/config');

routeListener.use((req, res, next) => {
    console.log('Request Received At - Config - ', Date.now());
    next();
});

routeListener.get('/', (req, res) => {
    controller.selectAll().then(data => {
        res.send(data);
    }).catch(error => {
        console.error('Error', error);
    });
});

routeListener.get('/id/:id', (req, res) => {
    controller.selectOne(req.params.id).then(data => {
        res.send(data[0]);
    }).catch(error => {
        console.error('Error', error);
    });
});

routeListener.post('/', (req, res) => {
    controller.insert(req.body).then(data => {
        res.send(data);
    }).catch(error => {
        console.error('Error', error);
    });
});

routeListener.put('/id/:id', (req, res) => {
    controller.update(req.params.id, req.body).then(data => {
        res.send(data);
    }).catch(error => {
        console.error('Error', error);
    });
});

routeListener.delete('/id/:id', (req, res) => {
    controller.delete(req.params.id).then(data => {
        res.send(data);
    }).catch(error => {
        console.error('Error', error);
    });
});

module.exports = routeListener;
