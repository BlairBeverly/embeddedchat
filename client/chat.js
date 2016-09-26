// creates elements with given attributes and classname
var createElement = function(element, attributes, classname) {
    var el = document.createElement(element)
    for (var i=0; i<attributes.length; i++) {
        var key = Object.keys(attributes[i])[0]
        el.setAttribute(key, attributes[i][key])
    }
    el.className = classname;
    return el;
}

// Load CSS stylesheet
var link = createElement('link', 
    [{'rel':'stylesheet'}, {'type':'text/css'}, {'href': 'styles.css'}])
document.head.appendChild(link);

// Load socketsio

// Create closed chatbox
var chatbox = createElement('div',[{'id': 'chatbox'}], 'closed')
chatbox.innerHTML = 'Chat with a representative';

// Add expand/minimize arrow to chatbox
var arrow = createElement('div', [{'id': 'arrow'}], 'arrow-up');
chatbox.appendChild(arrow);

// Create chathistory window and chatprompt, but don't show them
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
            console.log(prompt.innerHTML);
            prompt.innerHTML = '';
            return false;
        }
    }
}

// expand/minimize chatwindow when user clicks on it
chatbox.onclick = function(event) {
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




