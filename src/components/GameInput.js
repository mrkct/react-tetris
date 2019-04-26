import React, { Component } from 'react';


class GameInput extends Component{
    constructor(props){
        super(props);
        document.addEventListener("keydown", (e) => {
            const cb = this.props.onInput;
            switch(e.key){
                case "ArrowLeft":
                    cb("move", "left");
                    break;
                case "ArrowRight":
                    cb("move", "right");
                    break;
                case "a":
                case "A":
                    cb("rotate", "left");
                    break;
                case "s":
                case "S":
                    cb("rotate", "right");
                    break;
                default:
            }
        });
    }
    render(){
        const cb = this.props.onInput;
        return (
            <div className="gameController">
                <button onClick={cb.bind(this, "move", "left")}>
                    Left
                </button>
                <button onClick={cb.bind(this, "move", "right")}>
                    Right
                </button>
                <button onClick={cb.bind(this, "rotate", "left")}>
                    Rotate Left
                </button>
                <button onClick={cb.bind(this, "rotate", "right")}>
                    Rotate Right
                </button>
            </div>
        );
    }
}

export default GameInput;