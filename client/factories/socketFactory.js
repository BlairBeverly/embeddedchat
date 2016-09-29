myApp.factory('socket', function ($rootScope) {
  var socket = io.connect();

  document.addEventListener('keypress', onEnterPress, false);

  // When site owner hits return to submit a chat, emit it  

  // fix this so that path and nodes are not hardcoded
  function onEnterPress(event) {
      var box = document.getElementById(event.path[1].id)
      var prompt = box.childNodes[5]
      var myobj = {
                  user: 'Site Owner', 
                  message:prompt.innerHTML, 
                  customerId: 1234,
                  id:box.id,
                  convoId:box.dataset.convoId}
      console.log(myobj)
      if (prompt.tabIndex == 0){
          if (event.keyCode == 13) {
              socket.emit("chat_submitted", {
                  user: 'Site Owner', 
                  message:prompt.innerHTML, 
                  customerId: 1234,
                  id:box.id,
                  convoId:box.dataset.convoId});
              prompt.innerHTML = '';
              if (event.preventDefault) {
                 event.preventDefault();
              } else {
                 event.returnValue = false;
             }
          }
      }
  }

  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    },
    currentId: function(){
        return socket.id;
    }
  };
})