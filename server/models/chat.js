var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new mongoose.Schema({
    chat_from: String,
    message: String,
    customerId: Number,
    _conversation: {type: Schema.Types.ObjectId, ref: 'Conversation'}
}, {timestamps: true});

mongoose.model('Chat', ChatSchema);
