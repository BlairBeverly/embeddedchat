var mongoose = require('mongoose');
var conversations = mongoose.model('Conversation');

function Conversations(){
	this.getConversations = function(req, res){
		var customerid = req.params.customerid
		console.log('calling getConversations')
		conversations.find({customerId:customerid}, function(err, conversations){
			if(err){
				console.log(err);
				console.log('getConversations function chats controller');
			} else {
				res.json(conversations);
			}
		})		
	}
}


module.exports = new Conversations();
