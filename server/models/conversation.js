var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConversationSchema = new mongoose.Schema({
    rating: Number,
    customerId: Number,
    duration: Number,
    chats: [{type: Schema.Types.ObjectId, ref:'Chat'}]
}, {timestamps: true});

mongoose.model('Conversation', ConversationSchema);
