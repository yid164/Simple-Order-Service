// inventory schema for database

const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {type: String, required: true},
    price:{type: Number, required: true},
    description:{type: String, required:true},
    quantity:{type:Number, required:true}
});

module.exports = mongoose.model('Inventory', inventorySchema);