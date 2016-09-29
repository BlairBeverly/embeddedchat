myApp.controller('indexController', function($scope, socket){
    $scope.socketids = [];

    $scope.closeChat = function(socketid) {
        socket.emit('chat_completed', {id:socketid}, function() {
            $scope.socketids.splice($scope.socketids.indexOf(socketid), 1) 
        })        
    }

    socket.on('new_user', function(data){
        console.log(data, "<--------------- new_user data")
        $scope.socketids.push({socketid: data.id, convoId: data.convoId})
        // $scope.convoId = data.convoId;
        // console.log($scope.convoId, "<---------- convoid from scope")
    })

    socket.on('user disconnected', function(data){
        // console.log(data.id)
        $scope.socketids.splice($scope.socketids.indexOf(data.id), 1)
    })
    
    // todo-- dont hardcode childnodes
    socket.on('chat_updated', function(data) {
        console.log(data)
        var chat_from = data.user == 'Site Owner' ? 'you' : data.user
        chat = "<p>" + chat_from + ": " + data.message + "</p>"
        var chatbox = document.getElementById(data.id)
        // console.log(chatbox.childNodes)
        var chatHistory = chatbox.childNodes[3]
        chatHistory.innerHTML = chatHistory.innerHTML + chat;
        chatHistory.scrollTop = chatHistory.scrollHeight;
    })
})

