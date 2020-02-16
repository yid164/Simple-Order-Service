const express = require('express');

const app = express();

const morgen = require('morgan');

const bodyParser = require('body-parser');

const inventoryRoutes = require('./api/routes/inventories');

const orderRoutes = require('./api/routes/orders');

app.use(morgen('dev'));

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use(((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, UPDATE, DELETE, GET, PATCH');
        return res.status(200).json({});
    
    }
    next();
}))

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

