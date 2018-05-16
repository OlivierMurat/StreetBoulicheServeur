module.exports = function(io) {
    var Game = require('./game');

    function TransformUser(userID){
        return userID > 2 ? "Spectateur" : `Joueur ${userID}`;
    }
    
    var users = [];
    
    var game = new Game();
    
    io.on('connection', function (socket) {
        var user = TransformUser(users.length + 1);
        users.push(user);
        socket.emit("user", user);

        function isCurrentUser() {
            return user == game.getCurrentPlayerName();
        }
        
        if(users.length > 1 && game.getTable() == null){
            game.initialise(users[0], users[1]);
        }
        setTimeout(function() {
            if(game.table) sendGame();
            io.sockets.emit('users', users);
        }, 10);
    
        socket.on('mouseover', function(caseId) {
            if(!isCurrentUser())return;

            io.sockets.emit('inputchange', {
                id: caseId,
                player: game.getCurrentPlayer(),
            });
        });
    
        socket.on("click", function(caseId) {
            if(!isCurrentUser())return;

            if(user != game.getCurrentPlayer())
            var played = game.playColumn(caseId);
            sendGame();
            if(played == null || played == undefined)return;
            if(game.isWin(played))
            {
                io.sockets.emit("win", `Le joueur '${game.getCurrentPlayerName()}' a gagné !! Une nouvelle partie redémarre dans 5 secondes`);
                setTimeout(function (){
                    game.initialise(users[0], users[1]);
                    sendGame();
                }, 5000);
            }
            else
            {
                game.changePlayer();
            }
        });
    
        socket.on('disconnect', function () {
            var index = users.indexOf(user);
            
            users.splice(index, 1);
            io.sockets.emit('users', users);
        });
    });
    
    function sendGame(){
        io.sockets.emit("game", game.getTable());
    }
}