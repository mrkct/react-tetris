import BoardController from './BoardController';
import Tetramino from './Tetramino';
import Config from './Config';

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
            rotation: 0,
            type: Tetramino[type]
        };
    }

    /**
     * Tries to move the passed tetramino one cell in the passed direction and  
     * returns a new tetramino with the new position, if updated, otherwise the 
     * same object is returned.
     * @param {Array[][]} board 
     * @param {Tetramino} tetramino 
     * @param {String} direction: One of ['down', 'left', 'right']
     */
    static moveTetramino(board, tetramino, direction){
        let translate = {x: 0, y: 0};
        switch(direction){
            case "down":
                translate = {x: 0, y: +1};
                break;
            case "left":
                translate = {x: -1, y: 0};
                break;
            case "right":
                translate = {x: +1, y: 0};
                break;
            default:
                console.warn(
                    "Only 'down', 'left', 'right' are allowed values " + 
                    "for direction. Got " + direction + ". This moveTetramino call will do nothing."
                );
        }
        let isPositionFree = BoardController.isPositionFree(
			board,
			tetramino.x + translate.x,
			tetramino.y + translate.y,
			tetramino.type[tetramino.rotation]
        );
        if( !isPositionFree ){
            return tetramino;
        } 
        return {
            x: tetramino.x + translate.x,
            y: tetramino.y + translate.y,
            rotation: tetramino.rotation,
            type: tetramino.type
        };
    }

    /**
     * 
     * @param {*} board 
     * @param {*} tetramino 
     * @param {*} direction 
     */
    static rotateTetramino(board, tetramino, direction){
        let newRotationIndex = tetramino.rotation;
        if( direction === "left" ){
            newRotationIndex += (tetramino.type.length-1);
        } else if ( direction === "right" ){
            newRotationIndex += 1;
        }
        newRotationIndex = newRotationIndex % tetramino.type.length;
        let isPositionFree = BoardController.isPositionFree(
			board,
			tetramino.x,
			tetramino.y,
			tetramino.type[newRotationIndex]
        );
        if( !isPositionFree ){
            return tetramino;
        } 
        return {
            x: tetramino.x,
            y: tetramino.y,
            rotation: newRotationIndex,
            type: tetramino.type
        };
    }

    /**
     * Returns, in milliseconds, how much the game timer needs to wait 
     * before moving the falling piece down 1 block.
     * @param {Number} level: A number representing the current level, starting 
     * from 1
     */
    static calculateGameTimer(level){
        return Math.max(
			Config.TIMER.LOWEST, 
			Config.TIMER.START - (level-1) * Config.TIMER.DECREMENT
		);
    }

    /**
     * Returns true if the player has reached game over. Game over is defined 
     * by the player having at least 1 block in the first row of the board.
     * @param {Array[][]} board 
     */
    static isGameOver(board){
        for(let i = 0; i < board[0].length; i++){
            if( board[0][i] !== undefined ){
                return true;
            }
        }
        return false;
    }
}

export default GameController;