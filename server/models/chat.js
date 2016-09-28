var mongoose = require('mongoose');
var ChatSchema = new mongoose.Schema({
    chat_from: String,
    message: Number,
    customerId: Number
}, {timestamps: true});

mongoose.model('Chat', ChatSchema);
