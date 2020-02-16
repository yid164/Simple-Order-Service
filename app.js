const express = require('express');

const app = express();

const morgen = require('morgan');

const bodyParser = require('body-parser');

const inventoryRoutes = require('./api/routes/inventories');

const orderRoutes = require('./api/routes/orders');

app.use(morgen('dev'));

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use('/inventories', inventoryRoutes);

app.use('/orders', orderRoutes)

app.use((req, res, next)=>{
    const error = new Error('Not Found Error');
    error.status(404);
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message: error.message
        }
    })
});

module.exports = app;

