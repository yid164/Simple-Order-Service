const express = require('express');
const router = express.Router();


/**
 * Get and Post all inventory items
 */
router.get('/');

router.post('/');



/**
 * Get, Post, Put, and Delete a signle inventory item
 */
router.post('/:itemId');

router.get('/:itemId');

router.put('/:itemId');

router.delete('/itemId');


module.exports = router;





