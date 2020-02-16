// inventory schema for database

const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    itemName: {type: String, require: true},
    itemPrice:{type: Number, require: true},
    itemDescription:{type: String},
    itemQuantityAvailable:{type:Number, default: 0}
});

module.exports = mongoose.model('Inventory', inventorySchema);