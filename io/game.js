class Game{
    constructor() {
        this.table = null;
        this.player1 = null;
        this.player2 = null;
        this.currentPlayer = 0;
    }

    initialise(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;

        this.currentPlayer = 1;

        this.table = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
        ];
    }

    playColumn(columnId) {
        var empty = -1;
        columnId--;
        for (var key in this.table) {
            var row = this.table[key];
            if(row[columnId]) break;
            empty = parseInt(key);
        }
        if(empty > -1) {
            this.table[empty][columnId] = this.getCurrentPlayer();
            return {
                x : empty,
                y : columnId
            };
        }
        return null;
    }

    changePlayer(){
        this.currentPlayer = 3 - this.currentPlayer;
    }

    isWin(playedCell)
    {
        return this.checkHorizontal(playedCell) || this.checkVertical(playedCell) || this.checkDiag1(playedCell) || this.checkDiag2(playedCell);
    }

    checkHorizontal(playedCell)
    {
        var x = playedCell.x - 1;
        var y = playedCell.y;
        var count = 1;
        while(this.isValidPos(x, y) && this.getCell(x, y) == this.getCell(playedCell.x, playedCell.y))
        {
            count++;
            x--;
        }
        x = playedCell.x + 1;
        while(this.isValidPos(x, y) && this.getCell(x, y) == this.getCell(playedCell.x, playedCell.y))
        {
            count++;
            x++;
        }
        return count >= 4;
    }

    checkVertical(playedCell)
    {
        var x = playedCell.x;
        var y = playedCell.y - 1;
        var count = 1;
        while(this.isValidPos(x, y) && this.getCell(x, y) == this.getCell(playedCell.x, playedCell.y))
        {
            count++;
            y--;
        }
        y = playedCell.y + 1;
        while(this.isValidPos(x, y) && this.getCell(x, y) == this.getCell(playedCell.x, playedCell.y))
        {
            count++;
            y++;
        }
        return count >= 4;
    }

    checkDiag1(playedCell)
    {
        var x = playedCell.x - 1;
        var y = playedCell.y - 1;
        var count = 1;
        while(this.isValidPos(x, y) && this.getCell(x, y) == this.getCell(playedCell.x, playedCell.y))
        {
            count++;
            x--;
            y--;
        }
        x = playedCell.x + 1;
        y = playedCell.y + 1;
        while(this.isValidPos(x, y) && this.getCell(x, y) == this.getCell(playedCell.x, playedCell.y))
        {
            count++;
            x++;
            y++;
        }
        return count >= 4;
    }

    checkDiag2(playedCell)
    {
        var x = playedCell.x - 1;
        var y = playedCell.y + 1;
        var count = 1;
        while(this.isValidPos(x, y) && this.getCell(x, y) == this.getCell(playedCell.x, playedCell.y))
        {
            count++;
            x--;
            y++;
        }
        x = playedCell.x + 1;
        y = playedCell.y - 1;
        while(this.isValidPos(x, y) && this.getCell(x, y) == this.getCell(playedCell.x, playedCell.y))
        {
            count++;
            x++;
            y--;
        }
        return count >= 4;
    }

    isValidPos(x, y)
    {
        try
        {
            return this.getCell(x, y) !== undefined;
        }
        catch(err)
        {
            return false;
        }
    }

    getCurrentPlayerId(){
        return this.currentPlayer;
    }

    getCurrentPlayer(){
        return `player${this.currentPlayer}`;
    }

    getCurrentPlayerName(){
        return this[this.getCurrentPlayer()];
    }

    getTable() {
        return this.table;
    }

    getCell(x, y)
    {
        return this.table[x][y];
    }
}

module.exports = Game;