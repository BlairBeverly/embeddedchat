myApp.controller('indexController', function($scope, socket){
    $scope.socketids = [];

    socket.on('new_chat', function(data){
        console.log(data.id)
        $scope.socketids.push(data.id)
    })

    socket.on('user disconnected', function(data){
        console.log(data.id)
        $scope.socketids.splice($scope.socketids.indexOf(data.id), 1)
    })
        
    socket.on('chat_updated', function(data) {
        var chat_from = data.user == 'Site Owner' ? 'you' : data.user
        chat = "<p>" + chat_from + ": " + data.message + "</p>"
        var chatbox = document.getElementById(data.id)
        var chatHistory = chatbox.childNodes[1]
        chatHistory.innerHTML = chatHistory.innerHTML + chat;
        chatHistory.scrollTop = chatHistory.scrollHeight;
    })


    // }
})

	// dummyFactory.addDummy({name: 'req.body.test', status: 'working'}, function(data){
	// 	console.log(data);
	// })
