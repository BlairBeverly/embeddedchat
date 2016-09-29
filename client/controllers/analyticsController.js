myApp.controller('analyticsController', function($scope, chatFactory){
    $scope.avgRating = 5;

    // chatFactory.getAllChats(1234, function(data) {
    //     console.log(data)
    // })
    chatFactory.getAllConversations(1234, function(convos) {
        console.log(convos)
    })

    chatFactory.getAvgRating(1234, function(avgrating) {
        $scope.avgRating = avgrating
    })
})

