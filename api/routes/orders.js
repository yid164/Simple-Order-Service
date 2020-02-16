const express = require('express');

const router = express.Router();

const Inventory = require('../models/inventory');

const Order = require('../models/order');

const mongoose = require('mongoose');

/**
 * Get and Post all all orders
 */
// Get All Orders from database (Data Structure below)
// _id: mongoose.Types.ObjectId,
// customerEmail: {type: String},
// date: {type: Date},
// inventoryItem: {type:mongoose.Types.ObjectId, ref: 'Inventory', required: true},
// orderQuantity:{type: Number, required: true},
// orderStatus: {type: String}
router.get('/',(req, res, next)=>{
    Order.find()
    .select('_id customerEmail date inventoryItem orderQuantity orderStatus')
    .exec()
    .then(docs=>{
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc=>{
                return {
                    _id: doc._id,
                    customerEmail: doc.customerEmail,
                    date: doc.date,
                    inventoryItem: doc.inventoryItem,
                    orderQuantity: doc.orderQuantity,
                    orderStatus: doc.orderStatus,
                    request:{
                        type:'GET',
                        url: 'http://localhost:3000/orders/' + doc._id
                    }
                    
                }
            })
        });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    });
});


router.post('/',(req, res, next)=>{
    res.status(200).json({
        message: 'Handling Post /orders'
    })
});



/**
 * Get, Post, Put, and Delete a signle order
 */
router.post('/:orderId',(req, res, next)=>{
    const id = req.params.orderId;
    res.status(200).json({
        
        message: 'Handling Post /orders/',
        orderId: id
    })
});

router.get('/:orderId',(req, res, next)=>{
    res.status(200).json({
        message: 'Handling Get /orders/orderId'
    })
});

router.put('/:orderId',(req, res, next)=>{
    res.status(200).json({
        message: 'Handling Put /orders/orderId'
    })
});

router.delete('/:orderId',(req, res, next)=>{
    res.status(200).json({
        message: 'Handling Delete /orders/orderId'
    })
});;


module.exports = router;