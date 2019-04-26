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

    drawBlock(context, x, y, blockSize, color){
        const thickness = 2;
        context.fillStyle = "black";
        context.fillRect(
            blockSize * x,
            blockSize * y,
            blockSize,
            blockSize
        );
        context.fillStyle = color;
        context.fillRect(
            (blockSize * x) + thickness,
            (blockSize * y) + thickness,
            blockSize - (thickness*2),
            blockSize - (thickness*2)
        );
    }

    componentDidUpdate(){
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        const blockSize = this.blockSize;
        const width = this.width;
        const height = this.height;

        ctx.save();
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, width, height);
        
        const board = this.props.board;
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                if( board[i][j] !== undefined ) {
                    this.drawBlock(ctx, j, i, blockSize, board[i][j]);
                }
            }
        }

        const falling = this.props.falling;
        if( falling !== undefined ){
            const tetramino = falling.type[falling.rotation];
            for(let i = 0; i < tetramino.length; i++){
                for(let j = 0; j < tetramino[i].length; j++){
                    if( tetramino[i][j] !== undefined ){
                        this.drawBlock(
                            ctx,
                            falling.x + j, 
                            falling.y + i, 
                            blockSize, 
                            tetramino[i][j]
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