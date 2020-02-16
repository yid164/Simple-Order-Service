const express = require('express');

const app = express();

const morgen = require('morgan');



const inventoryRoutes = require('./api/routes/inventories');

const orderRoutes = require('./api/routes/orders');

app.use(morgen('dev'));

app.use('/inventories', inventoryRoutes);

app.use('/orders', orderRoutes)

app.use((req, res, next)=>{
    res.status(200).json({
        message: 'It works'
    });
});

module.exports = app;

