module.exports = function(socket, cbNotResponding, delay = 1000) {
    var pingTimeout = null;
    socket.on('my-pong', function() {
        clearTimeout(pingTimeout);
    })
    var pingInterval = setInterval(function() {
        socket.emit('my-ping');
        pingTimeout = setTimeout(function() {
            cbNotResponding();
        }, delay);
    }, delay);
}