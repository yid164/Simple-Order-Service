// order schema for database

const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    customerEmail: {type: String},
    date: {type: Date},
    orderStatus: {type: String}
});

module.exports = mongoose.model('Order', orderSchema);