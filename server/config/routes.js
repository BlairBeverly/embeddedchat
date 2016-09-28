var Chats = require('../controllers/chats.js')

module.exports = function(app, server){
	app.post('/dummies/:test', function(req, res){
		
		// I'm testing the info that I'm getting from my dummy Factory
		// I console.log the body and the params just to make sure that it's
		// going through 

		console.log(req.body);
		console.log(req.params.test)
		// mongooseController.getMongooses(req, res);
	})

    var messages = [];

    var io = require('socket.io').listen(server);

    io.on('connection', function(socket) {
        console.log('using sockets');
        console.log(socket.id);

        socket.broadcast.emit('new_chat', {id:socket.id})

        socket.on('chat_submitted', function(data) {
            console.log(data)
            messages.push(data)
            io.emit('chat_updated', data);
        })

        socket.on('disconnect', function () {
            console.log('disconnected')
            io.emit('user disconnected', {id:socket.id});
        });



    })
}
