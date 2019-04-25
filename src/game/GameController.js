import BoardController from './BoardController';
import Tetramino from './Tetramino';


class GameController{
    /**
     * Creates and returns an object representing a tetramino, picked randomly, 
     * starting in position at first row and using the passed argument as the 
     * starting column.
     * @param {Number} x: Starting x position of the tetramino 
     * @returns {Object} Object representing a Tetramino
     */
    static createTetramino(x){
        const types = Tetramino.TYPES;
        let type = types[Math.floor(Math.random() * types.length)];
        return {
            x: x,
            y: 0,
            type: Tetramino[type]
        };
    }

    /**
     * Tries to move the passed tetramino one row down and returns a new object 
     * with the new position, if updated, otherwise the same object is returned.
     * @param {Array[][]} board 
     * @param {Tetramino} tetramino 
     */
    static moveTetramino(board, tetramino){
        let isPositionFree = BoardController.isPositionFree(
			board,
			tetramino.x,
			tetramino.y + 1,
			tetramino.type
        );
        if( !isPositionFree ){
            return tetramino;
        } 
        return {
            x: tetramino.x,
            y: tetramino.y + 1,
            type: tetramino.type
        };
    }
}

export default GameController;