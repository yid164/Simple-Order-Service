const express = require('express');
const router = express.Router();


/**
 * Get and Post all all orders
 */
router.get('/');

router.post('/');



/**
 * Get, Post, Put, and Delete a signle order
 */
router.post('/:orderId');

router.get('/:orderId');

router.put('/:orderId');

router.delete('/orderId');


module.exports = router;