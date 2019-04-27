import React, { Component } from 'react';

/**
 * Takes a hex string representing a color and lighten it. Positive 
 * values make the color brighter, negative make it darker.
 * From: https://www.sitepoint.com/javascript-generate-lighter-darker-color/
 * @param {String} hex: Hex string of a color 
 * @param {Number} lum: How much to brighten, or darken, the color 
 */
function ColorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }

    return rgb;
}

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
        const thickness = 1;
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
        context.fillStyle = ColorLuminance(color, -0.2);
        context.fillRect(
            (blockSize * x) + blockSize/4,
            (blockSize * y) + blockSize/4,
            blockSize / 2,
            blockSize / 2
        )
    }

    drawBackground(context, width, height, blockSize){
        context.fillStyle = "black";
        context.fillRect(
            0, 0, blockSize * width, blockSize * height
        );
        context.fillStyle = "gray";
        for(let i = 0; i < width; i++){
            context.fillRect(0, i * blockSize, width * blockSize, 1);
        }
        for(let i = 0; i < height; i++){
            context.fillRect(i * blockSize, 0, 1, height * blockSize);
        }
    }

    componentDidUpdate(){
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        const blockSize = this.blockSize;
        const width = this.width;
        const height = this.height;

        ctx.save();
        this.drawBackground(ctx, width, height, blockSize);
        
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