var mongoose = require('mongoose');
var chats = mongoose.model('Chat');

function Chats(){
	this.getMongoose = function(req, res){
	// 	mongooseDb.find({}, function(err, mongooses){
	// 		if(err){
	// 			console.log(err);
	// 			console.log('getmongooses function mongooses controller');
	// 		} else {
	// 			res.json(mongooses);
	// 		}
	// 	})		
	}
	this.createMongoose = function(req, res){
		console.log("creating mongoose");
	}
}

module.exports = new Chats();
