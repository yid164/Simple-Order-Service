// order schema for database

const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    customerEmail: {type: String},
    date: {type: Date},
    inventoryItem: {type:mongoose.Types.ObjectId, ref: 'Inventory', required: true},
    orderQuantity:{type: Number, required: true},
    orderStatus: {type: String}
});

module.exports = mongoose.model('Order', orderSchema);