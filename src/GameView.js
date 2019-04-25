import React, { Component } from 'react';


/**
 * Component that shows an array of arrays in a canvas, where each element
 * is a square. If the content of the square is a string representing a valid 
 * color a square of that color is drawn in the corresponding position in the 
 * matrix. If the elements contains undefined it is not drawn. You can also 
 * pass an extra parameter 'blockSize', which represents the size of a single 
 * cell in pixel.
 */
class GameView extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.blockSize = this.props.blockSize ? this.props.blockSize : 24;
        
        const board = this.props.board;
        this.height = this.blockSize * board.length;
        this.width = this.blockSize * board[0].length;
    }

    componentDidUpdate(){
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        const blockSize = this.blockSize;
        const width = this.width;
        const height = this.height;

        ctx.save();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);
        
        const board = this.props.board;
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                if( board[i][j] !== undefined ) {
                    ctx.fillStyle = board[i][j];
                    ctx.fillRect(
                        blockSize * j, 
                        blockSize * i, 
                        blockSize, 
                        blockSize
                    );
                }
            }
        }

        const falling = this.props.falling;
        if( falling !== undefined ){
            for(let i = 0; i < falling.type.length; i++){
                for(let j = 0; j < falling.type[i].length; j++){
                    if( falling.type[i][j] !== undefined ){
                        ctx.fillStyle = falling.type[i][j];
                        ctx.fillRect(
                            blockSize * (falling.x + j),
                            blockSize * (falling.y + i),
                            blockSize,
                            blockSize
                        );
                    }
                }
            }
        }
        ctx.restore();
    }

    render() {
        return (
            <canvas 
                className="gameView" 
                width={this.width} 
                height={this.height} 
                ref={this.canvasRef} >
                Your browser does not support the canvas element
            </canvas>
        );
    }
}

export default GameView;