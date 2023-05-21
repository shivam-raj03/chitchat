const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require("cors");

const {addUser, removeUser, getUser, getUserInRoom} = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

app.use(cors());

const router = require('./router')

const PORT = process.env.PORT || 4000;

io.on('connection', (socket) => {
    console.log('We have new connection');

    socket.on('join', ({ name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room});

        if (error) {
            return callback(error);
        }

        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the ${user.room}`});
        socket.to(user.room).emit('messase', {user: 'admin', text: `${user.name}, has joined!`});

        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room)});

        callback();
        
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message});
        io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room)});   

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', { user : 'admin', text: `${user.name} has left`});
        }
    });
});


app.use(router);

server.listen(PORT, () => {
    console.log(`Server has started at Port ${PORT}`);
});