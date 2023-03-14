const socket = io("http://localhost:8000")


let name = prompt('Enter your name to join')

socket.emit('user-joined', name)
let section = document.querySelector('.mid-section')


let newUser = document.getElementsByClassName('user-name')
for (let i = 0; i < newUser.length; i++) {
    newUser[i].innerHTML = name
    newUser[i].classList.add('name')
}

function appenMessage(message, pos) {
    let msg = document.createElement('div')
    msg.innerHTML = message
    msg.classList.add('alert')
    if (pos == 'left') {
        msg.classList.add('alert-primary')
    }
    else {
        msg.classList.add('alert-success')
    }
    section.appendChild(msg)
}

socket.on('join', (name) => {
    appenMessage(`${name} has joined the chat`, 'left')
})

function sendMessage(){
    let msg = document.getElementById('message')
    appenMessage(`${msg.value} : you`, 'right')
    socket.emit('send', msg.value)
    msg.value = ''
}

socket.on('receive', (obj) => {
    appenMessage(`${obj.name} : ${obj.message} `, 'left')
})
socket.on('left', (name) => {
    appenMessage(`${name} left the chat`, 'left')
})