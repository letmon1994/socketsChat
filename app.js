var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.emit('some event', {
    for: 'everyone'
});

io.on('connection', function (socket) {
    console.log('a user connected');
    io.emit('conn');
    socket.on('disconnect', function () {
        console.log('a user discconected');
        io.emit('disc');
    });
    socket.on('chat message', function (msg) {
        socket.broadcast.emit('chat message', msg);
    });

});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
