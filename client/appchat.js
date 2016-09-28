// window.onkeypress = function(event) {
//     var prompt = document.getElementById('chatprompt')
//     console.log(event)

//     if (prompt.tabIndex == 0) {
//         if (event.keyCode == 13) {
//             // console.log(event)
//             socket.emit("chat_submitted", {
//                 user: 'you', 
//                 message:prompt.innerHTML, 
//                 customerId: 1234,
//                 id:prompt.parentNode.id});
//             prompt.innerHTML = '';
//             return false;
//         }
//     }
// }



document.addEventListener('keypress', onEnterPress, false);

function onEnterPress(event) {
    var box = document.getElementById(event.path[1].id)
    var prompt = box.childNodes[3]
    if (prompt.tabIndex == 0){
        if (event.keyCode == 13) {
            socket.emit("chat_submitted", {
                user: 'Site Owner', 
                message:prompt.innerHTML, 
                customerId: 1234,
                id:box.id});
            prompt.innerHTML = '';
            if (event.preventDefault) {
               event.preventDefault();
            } else {
               event.returnValue = false;
           }
        }
    }
}