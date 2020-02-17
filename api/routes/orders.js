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


// Post an Orders from database (Data Structure below)
// _id: mongoose.Types.ObjectId,
// customerEmail: {type: String},
// date: {type: Date},
// inventoryItem: {type:mongoose.Types.ObjectId, ref: 'Inventory', required: true},
// orderQuantity:{type: Number, required: true},
// orderStatus: {type: String}
router.post('/',(req, res, next)=>{

    const id = req.body.inventoryId;
    Inventory.findById(id)

    .then(inventory =>{
        if(!inventory)
        {
            return res.status(404).json({
                message: "No Item Found"
            });
        }
        const newQuantity = inventory.quantity - req.body.orderQuantity;
        if(newQuantity < 0)
        {
            return res.status(404).json({
                message: "No enough item avaiable"
            })
        }
        Inventory.update({_id: id}, {$set: {quantity: newQuantity}})
        .exec()
        .then()
        .catch();

        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            customerEmail: req.body.customerEmail,
            date: new Date(),
            inventoryItem: req.body.inventoryId,
            orderQuantity: req.body.orderQuantity,
            orderStatus: req.body.orderStatus

        });
        return order
        .save()
        .then(result=>{
            console.log(result);
            res.status(201).json({
                message: 'Order Saved',
                createOrder:{
                    _id: result._id,
                    customerEmail: result.customerEmail,
                    date: result.date,
                    inventoryItem: result.inventoryId,
                    orderQuantity: result.orderQuantity,
                    orderStatus: result.orderStatus
                },
                request:{
                    type:'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            });
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: 'Product not found or some else problems',
            error: err
        })
    });
});



/**
 * Get, Post, Put, and Delete a signle order
 */

 // get a single order (Data Structure below)
// _id: mongoose.Types.ObjectId,
// customerEmail: {type: String},
// date: {type: Date},
// inventoryItem: {type:mongoose.Types.ObjectId, ref: 'Inventory', required: true},
// orderQuantity:{type: Number, required: true},
// orderStatus: {type: String}
router.get('/:orderId',(req, res, next)=>{
    const id = req.params.orderId;
    Order.findById(id)
    .select('_id customerEmail date inventoryItem orderQuantity orderStatus')
    .exec()
    .then(docs=>{
        console.log("GET from database");
        if(docs)
        {
            res.status(200).json({
                orders: docs,
                request:{
                    type:'GET',
                    url: 'http://localhost:3000/orders/' + docs._id
                }
            });
        }else{
            res.status(404).json({
                message: 'Order not found'
            });
        }

    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});


/**
 * Update the order
 */
router.put('/:orderId',(req, res, next)=>{
    const id = req.params.orderId;
    const updateOps = {};
    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
  
    }
    const inventoryId =  updateOps['inventoryId'];
    const quantityChange = updateOps['orderQuantity'];
    Inventory.findById(inventoryId).exec().then(result=>{
        var inventoryQantity = result.quantity;
        Order.findById(id).exec().then(res=>{
            var currentQantity = res.orderQuantity;
            var total = currentQantity + inventoryQantity;
            console.log("TOTOAL IS " + total);
            if(total - quantityChange >= 0)
            {
                var afterChange = total - quantityChange;
                console.log("After Change    " + afterChange);
                Inventory.update({_id: inventoryId}, {$set:{quantity:afterChange}})
                .exec()
                .then(result=>{
                    res.status(200).json({
                        message: "udpated the inventory already"
                    });
                })
                .catch(err=>{
                    error: err
                });
            }else{
                res.status(500).json({
                    message: "Not enough quantities"
                })
            }
        }).catch(err=>{
            error: err
        });


    }).catch(err=>{
        error=> err
    });

    Order.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'Order updated',
            request:{
                type: 'GET',
                url: 'http://localhost:3000/orders/' + id
            }
        })
    })
    .catch(err=>{
        error: err
    });
});

// delete api
router.delete('/:orderId',(req, res, next)=>{

    const id = req.params.orderId;
    
    Order.findByIdAndRemove(id)
    .exec()
    .then(result=>{
        const quantityFromOrder = result.orderQuantity;
        const inventoryId = result.inventoryId;
        Inventory.update({_id: inventoryId}, {$set:{quantity: quantityFromOrder}})
        .exec()
        .then(res=>{
            res.status(200).json({
                message: "Has added back to inventory"
            })
        })
        .catch();
        res.status(200).json({
            message: "Ordered Deleted"
        })
    })
    .catch(err=>{
        error: err;
    });
});;


module.exports = router;