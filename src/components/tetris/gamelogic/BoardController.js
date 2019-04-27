class BoardController{
    /**
     * Creates and returns a matrix to be used for the game board.
     * This is a plain matrix of width x height of all 'undefined'.
     * @param {Number} width 
     * @param {Number} height 
     */
    static createBoard(width, height){
        let board = new Array(height);
        for(let i = 0; i < board.length; i++){
            board[i] = new Array(width);
        }

        return board;
    }

    /**
     * Returns a new board of the same size of all 'undefined'
     * @param {Array[][]} board: The board to clear 
     */
    static clearBoard(board){
        return this.createBoard(board[0].length, board.length);
    }

    /**
     * Deletes the full rows in the board and returns how many 
     * rows have been deleted. This modifies the passed board also.
     * @param {Array[][]} board: The board to update
     * @returns {Number}: How many rows have been cleared by this update
     */
    static updateBoard(board){
        let cleared = 0;
        const width = board[0].length;
        const height = board.length;
        for(let i = 0; i < height; i++){
            if( this.isRowFull(board, i) ){
                for(let j = i; j > 0; j--){
                    for(let k = 0; k < width; k++){
                        board[j][k] = board[j-1][k];
                    }
                }
                for(let j = 0; j < width; j++){
                    board[0][j] = undefined;
                }
                cleared++;
            }
        }
        return cleared;
    }

    /**
     * Returns true if the referenced row is not all set to undefined
     * @param {Array[][]} board: The board where to check
     * @param {Number} row: Index of the row to check 
     */
    static isRowFull(board, row){
        const width = board[row].length;
        for(let i = 0; i < width; i++){
            if( board[row][i] === undefined ){
                return false;
            }
        }
        return true;
    }

    /**
     * Returns a distinct copy of the board.
     * @param {Array[][]}: An array of arrays of objects
     */
    static cloneBoard(board){
        return board.map(c => c.slice());
    }

    /**
     * Returns true if a tetramino in a certain position doesn't overlap with 
     * any other already placed tetraminos in the game board.
     * @param {Array[][]} board: The board to check on
     * @param {Number} x: X coordinate, in blocks, starting from left
     * @param {Number} y: Y coordinate, in blocks, starting from top
     * @param {Array[][]} type: An array of color strings, representing the
     * tetramino
     */
    static isPositionFree(board, x, y, type){
        const width = board[0].length;
        const height = board.length;
        for(let i = 0; i < type.length; i++){
            for(let j = 0; j < type[i].length; j++){
                if( type[i][j] !== undefined ){
                    let between = (x, low, high) => x > low && x < high;
                    if( !between(x+j, -1, width) || !between(y+i, -1, height) ){
                        return false;
                    }
                    if( board[y+i][x+j] !== undefined ){
                        return false;
                    }
                }
            }
        }
        return true;
    }

    /**
     * Copies all contents in tetramino over board in the specified position,
     * the top-left corner of where to start placing. Returns a new, modified
     * board.
     * @param {Array[][]} board 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Array[][]} tetramino 
     */
    static applyTetramino(board, tetramino){
        board = this.cloneBoard(board);
        let toApply = tetramino.type[tetramino.rotation];
        for(let i = 0; i < toApply.length; i++){
			for(let j = 0; j < toApply[i].length; j++){
                if( toApply[i][j] !== undefined ){
                    board[tetramino.y + i][tetramino.x + j] = toApply[i][j];
                }
			}
        }
        return board;
    }
}

export default BoardController;