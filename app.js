// express
const express = require('express');

// using
const app = express();

// using morgen for error log
const morgen = require('morgan');

// using bodyParser for read and input json
const bodyParser = require('body-parser');

// using mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sosapi:'+ process.env.MONGO_ATLAS_PW+'@simple-order-service-zg5yk.mongodb.net/test?retryWrites=true&w=majority',{
    useUnifiedTopology:true,
    useNewUrlParser: true
})

// the inventories route
const inventoryRoutes = require('./api/routes/inventories');

// the orders route
const orderRoutes = require('./api/routes/orders');

app.use(morgen('dev'));

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

// CORS handling
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

// route inventories
app.use('/inventories', inventoryRoutes);

// route orders
app.use('/orders', orderRoutes)

// error handling
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

