const express = require('express')
const routeListener = express.Router();
const controller = require('../controllers/build');

routeListener.use((req, res, next) => {
    console.log('Request Received At - Run - ', Date.now());
    next();
});

routeListener.get('/id/:id', (req, res) => {
    controller.build(req.params.id);
    res.send({
        'message': 'Build Started For - ' + req.params.id
    });
});

routeListener.post('/id/:id', (req, res) => {
    controller.build(req.params.id, req.body);
    res.send({
        'message': 'Build Started For - ' + req.params.id
    });
});

module.exports = routeListener;
