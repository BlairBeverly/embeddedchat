var mongoose = require('mongoose');
var chats = mongoose.model('Chat');

function Chats(){
	this.getChats = function(req, res){
		var customerid = req.params.customerid
		console.log('calling getChats')
		chats.find({customerId:customerid}, function(err, chats){
			if(err){
				console.log(err);
				console.log('getChats function chats controller');
			} else {
				res.json(chats);
			}
		})		
	}
	this.createMongoose = function(req, res){
		console.log("creating mongoose");
	}
}


module.exports = new Chats();
