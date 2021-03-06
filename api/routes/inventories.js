const express = require('express');
const router = express.Router();

const Inventory = require('../models/inventory');
const mongoose = require('mongoose');

/**
 * Get and Post all inventory items
 */

 /**
  * Implemeted GET all inventories
  */
router.get('/',(req, res, next)=>{
    Inventory.find()
    .select('_id name price description quantity')
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            inventories: docs.map(doc=>{
                return{
                    name: doc.name, 
                    price: doc.price,
                    description: doc.description,
                    quantity: doc.quantity,
                    request:{
                        type:'GET',
                        url: 'http://localhost:3000/inventories/' + doc._id
                    }
                }
            })
        };
        console.log(docs);
        res.status(200).json(response);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});

/**
 * Setup the post inventory 
 */
router.post('/',(req, res, next)=>{
    const inventory = new Inventory({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity
    });

    inventory.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'Create inventory item successfully',
            createInventory:{
                name: result.name,
                price: result.price,
                description: result.description,
                quantity: result.quantity,
                _id: result._id,
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/inventories/' + result._id
                }
            }
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});



/**
 * Get, Put, and Delete a signle inventory item
 */
/**
 * Implement get one item
 */
router.get('/:itemId',(req, res, next)=>{
    const id = req.params.itemId;
    Inventory.findById(id)
    .select('name price description quantity _id')
    .exec()
    .then(docs=>{
        console.log('Get item: '+ docs);
        if(docs)
        {
            res.status(200).json({
                item: docs,
                request:{
                    type:'GET',
                    url: 'http://localhost:3000/inventories/' + docs._id
                }
            });
        }else{
            res.status(404).json({message: 'No valid entry found for privided ID'});
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
 * Implemete updated item, I used table to store the updated operation 
 * propName is the attribute that require to update, value is the new value
 * require a list to store the json file
 */
router.put('/:itemId',(req, res, next)=>{
    const id = req.params.itemId;
    const updateOps = {};
    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }
    Inventory.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message: 'Update inventory item successful',
            item: result,
            request:{
                type:'GET',
                url: 'http://localhost:3000/inventories/' + id
            }
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

/**
 * Implement delete item from inventories
 */
router.delete('/:itemId', (req, res, next)=>{
    const id = req.params.itemId;
    Inventory.remove({_id: id})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message: 'Delete inventory item successful',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/inventories',
                body:{name:'String', price:'Number', quantity:'Number',description:'String'}
            }
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

// Baiscly done of inventories, maybe do next of them tomorrow!
module.exports = router;





