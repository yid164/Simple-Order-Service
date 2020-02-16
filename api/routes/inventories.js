const express = require('express');
const router = express.Router();


/**
 * Get and Post all inventory items
 */
router.get('/',(req, res, next)=>{
    res.status(200).json({
        message: 'Handling Get /inventroies'
    })
});

router.post('/',(req, res, next)=>{
    res.status(200).json({
        message: 'Handling Post /inventroies'
    })
});



/**
 * Get, Post, Put, and Delete a signle inventory item
 */
router.post('/:itemId',(req, res, next)=>{
    res.status(200).json({
        message: 'Handling Post /inventroies/itemId'
    })
});

router.get('/:itemId',(req, res, next)=>{
    res.status(200).json({
        message: 'Handling Get /inventroies/itemId'
    })
});

router.put('/:itemId',(req, res, next)=>{
    res.status(200).json({
        message: 'Handling Put /inventroies/itemId'
    })
});

router.delete('/itemId', (req, res, next)=>{
    res.status(200).json({
        message: 'Handling Delete /inventroies/itemId'
    })
});


module.exports = router;





