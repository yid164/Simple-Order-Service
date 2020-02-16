const express = require('express');
const router = express.Router();



/**
 * Get and Post all all orders
 */
router.get('/',(req, res, next)=>{
    res.status(200).json({
        message: 'Handling Get /orders'
    })
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