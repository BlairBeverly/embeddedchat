var chatController = require('../controllers/chats.js')
var conversationController = require('../controllers/conversations.js')


module.exports = function(app, server){
    app.get('/chats/:customerid', function(req, res) {
        chatController.getChats(req, res);
    })
    app.get('/conversations/:customerid', function(req, res) {
        conversationController.getConversations(req, res);
    })

	app.post('/:test', function(req, res){
		
		// I'm testing the info that I'm getting from my dummy Factory
		// I console.log the body and the params just to make sure that it's
		// going through 

		console.log(req.body);
		console.log(req.params.test)
		// mongooseController.getMongooses(req, res);
	})
}
