const express = require("express");
const app = express();

app.set('view engine', 'ejs');

server = app.listen("3000", () => console.log("Server is running..."));

const io = require("socket.io")(server);

io.on('connection', (socket) => {
	console.log('New user connected')

	socket.username = "Anonymous"

    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    socket.on('new_message', (data) => {
        io.sockets.emit('add_mess', {message : data.message, id_c:data.id_c});
    })

    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})
