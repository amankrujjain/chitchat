const io = require("socket.io")(8000,{
    cors:'*'})
var user = {}
io.on('connection',(socket)=>{
    socket.on('user-joined',(name)=>{
        socket.broadcast.emit('join',name)
        user[socket.id] = name
    })
    socket.on('send',(message)=>{
        socket.broadcast.emit('receive',{message:message,name:user[socket.id]})
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('left',user[socket.id])
        delete user[socket.id]
    })
})


// Explain the flow
// So in the first line socket.io was imported and all the data was stored in a variable named io
//using function curring we have called another function containing the port of the server
//we have also passed cors, cors tells the system that there are two servers running for the app and its not a hacker
//The m,ain line starts from here,
// we have made a connection starting with "io.on" in this connection it takes an event and call back function
//The first event that we pass is connection the default body syntax , and in the calll vback function we pass socket as a parameter,  so a question arises from where
//we will get the argument?
//For that inside the io vlock we call socket.on , this is the argument that the connection will take.
// in socket.on we first define the event in which user is joined and pass a call function getting the argument as name, namew is coming from index.js file
// Now we are broadcasting the socket "socket.broadcast.emit" this will tell all the user that a new user has joined the chat, but the new user
// Second socket is bfor send message , in which socket is broadcasted and eceive event is pass along with the message
// Lat socket is for disconnection , in this socket we again broadcast when any user eave the chat, and deletes the user[socket.id]