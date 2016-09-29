// creates elements with given attributes and classname
var createElement = function(element, attributes, classname) {
    var el = document.createElement(element)
    for (var i=0; i<attributes.length; i++) {
        var key = Object.keys(attributes[i])[0]
        el.setAttribute(key, attributes[i][key])
    }
    if (classname) {
        el.className = classname;
    }
    return el;
}

var host = 'http://localhost:8000/';
console.log(customerId);

// Load CSS stylesheet
var link = createElement('link', 
    [{'rel':'stylesheet'}, {'type':'text/css'}, {'href': host + 'styles.css'}])
document.head.appendChild(link);

// Load five-star-rating CSS stylesheet
var link = createElement('link', 
    [{'rel':'stylesheet'}, {'type':'text/css'}, {
        'href': host + '/five-star-rating/css/rating.min.css'}])
document.head.appendChild(link);

// Load socket.io
var script = createElement('script',
    [{'src':host + "socket.io/socket.io.js"}])
document.body.appendChild(script)

// Load five-star-rating
var script = createElement('script',
    [{'src':host + "five-star-rating/js/dist/rating.min.js"}])
document.body.appendChild(script)

// Create minimized chatbox
var chatbox = createElement('div',[{'id': 'chatbox'}], 'closed')
chatbox.innerHTML = customMessage;

// Add expand/minimize arrow to chatbox
var arrow = createElement('div', [{'id': 'arrow'}], 'arrow-up');
chatbox.appendChild(arrow);

// Create chathistory window and chatprompt, but keep them hidden
var chathistory = createElement('div', [{'id': 'chathistory'}], 'hidden');
chatbox.appendChild(chathistory);

var chatprompt = createElement('div', 
    [{'id': 'chatprompt'}, {'contenteditable': 'true'}], 'hidden');
chatbox.appendChild(chatprompt);


// when user enters text into chatprompt, send the text to server
window.onkeypress = function(event) {
    var prompt = document.getElementById('chatprompt')
    if (prompt.tabIndex == 0) {
        if (event.keyCode == 13) {
            socket.emit("chat_submitted", {
                user: 'Site Visitor', 
                message:prompt.innerHTML, 
                customerId: 1234,
                id: '/#' + socket.id});
            prompt.innerHTML = '';
            return false;
        }
    }
}

var socket;

chatbox.onclick = function(event) {
    // initialize socket and listen for chat updates
    if (!socket){
        console.log('connecting socketio')
        socket = io.connect(host, {query: 'customerId=1234'});

        socket.on('connect', function() {
            console.log(socket.id)
        })

        socket.on('chat_updated', function(data) {
            if (data.id == '/#' + socket.id) {
                var chat_from = data.user == 'Site Visitor' ? 'you' : data.user
                console.log(data)
                chat = "<p>" + chat_from + ": " + data.message + "</p>"
                var chatHistory = document.getElementById('chathistory')
                chatHistory.innerHTML = chatHistory.innerHTML + chat;
                chatHistory.scrollTop = chatHistory.scrollHeight;
            }
        })

        socket.on('chat_completed', function(){
            document.getElementById('chatprompt').remove()

            // add an unordered list element that will hold the rating stars
            var box = document.getElementById('chatbox')
            var ratingheader = createElement('P', [{'id': 'rate'}])
            ratingheader.innerHTML = 'Rate your chat experience'
            box.appendChild(ratingheader);
            box.appendChild(createElement('UL',[{'id': 'ratingbox'}], 'c-rating'))
            var ratingbox = document.querySelector('#ratingbox');


            // current rating, or initial rating
            var currentRating = 0;

            // max rating, i.e. number of stars you want
            var maxRating= 5;

            // callback to run after setting the rating
            var callback = function(rating) {
                socket.emit('rating_submitted', {rating:rating}); };

            // rating instance
            var myRating = rating(ratingbox, currentRating, maxRating, callback);
        })
    }

    // expand/minimize chatwindow when user clicks on it
    if (document.getElementById('chatbox').className == 'closed' && document.getElementById('arrow').className == 'arrow-up') {
        document.getElementById('chatbox').className = 'open';
        document.getElementById('arrow').className = 'arrow-down';
        document.getElementById('chathistory').className = '';
        document.getElementById('chatprompt').className = '';
    // only minimize if minimize button initiated click event
    } else if (event.path[0].className == 'arrow-down') {
        document.getElementById('chatbox').className = 'closed';
        document.getElementById('chathistory').className = 'hidden';
        document.getElementById('chatprompt').className = 'hidden';
        document.getElementById('arrow').className = 'arrow-up'
    }
}

document.body.appendChild(chatbox);




