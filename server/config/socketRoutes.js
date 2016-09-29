var mongoose = require('mongoose');
var Chat = mongoose.model('Chat');
var Conversation = mongoose.model('Conversation')

module.exports = function(server){

    var io = require('socket.io').listen(server);

    io.use(function(socket, next) {
        next();
    })

    io.on('connection', function(socket) {
        console.log('using sockets');
        console.log(socket.id);

        var convoId;

        if (socket.handshake.query.customerId) {
            var conversation = new Conversation({
                customerId: socket.handshake.query.customerId,
            })
            conversation.save(function(err, newConversation){
                if (err) {
                    console.log('err creating convo')
                } else {
                    console.log('successfully created convo')
                    convoId = newConversation._id
                    socket.broadcast.emit('new_user', {id: socket.id, convoId: convoId})
                }
            })         
        }

        
        socket.on('chat_submitted', function(data) {
            io.emit('chat_updated', data);
            var chat = new Chat({
                chat_from: data.user,
                message: data.message,
                customerId: data.customerId,
                _conversation: data.convoId
            });

            var conversationId;
            if (convoId) {
                conversationId = convoId
            } else {
                conversationId = data.convoId
            }

            Conversation.findOne({_id: conversationId}, function(err, convo) {
                chat.save(function(err, newChat){
                    convo.chats.push(chat)
                    convo.save(function(err) {
                        if (err) {
                            console.log('error saving chat', newChat, err)
                        } else {
                            console.log('successfully saved chat', newChat)
                        }                  
                    })
                })
            })
            
        })

        socket.on('rating_submitted', function(data){
            Conversation.update({_id:convoId}, {$set: {rating: data.rating}}, 
                function(err, conv) {
                    if (err) {
                        console.log('error saving rating to convo')
                    } else {
                        console.log('saved rating to convo', convoId)
                    }
                })

        })

        socket.on('chat_completed', function(data, callback) {
            console.log(data)
            socket.broadcast.emit('chat_completed', data)
            callback()
        })

        socket.on('disconnect', function () {
            console.log('disconnected')
            io.emit('user disconnected', {id: socket.id});
        });
    })

}