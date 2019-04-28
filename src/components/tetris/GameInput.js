import React, { Component } from 'react';
import './GameInput.css';


export class GameInput extends Component{
    constructor(props){
        super(props);
        document.addEventListener("keydown", (e) => {
            const cb = this.props.onInput;
            switch(e.key){
                case "ArrowLeft":
                    cb(Input.MOVE.LEFT);
                    break;
                case "ArrowRight":
                    cb(Input.MOVE.RIGHT);
                    break;
                case "ArrowDown":
                    cb(Input.MOVE.DOWN);
                    break;
                case "a":
                case "A":
                    cb(Input.ROTATE.LEFT);
                    break;
                case "s":
                case "S":
                    cb(Input.ROTATE.RIGHT);
                    break;
                default:
            }
        });
    }
    render(){
        const cb = this.props.onInput;
        return (
            <div className="gameController">
                <div className="moveButtons">
                    <button className="gameButton" onClick={cb.bind(this, Input.MOVE.LEFT)}>
                        Left
                    </button>
                    <button className="gameButton" onClick={cb.bind(this, Input.MOVE.DOWN)}>
                        Down
                    </button>
                    <button className="gameButton" onClick={cb.bind(this, Input.MOVE.RIGHT)}>
                        Right
                    </button>
                </div>
                <div className="rotateButtons">
                    <button className="gameButton" onClick={cb.bind(this, Input.ROTATE.LEFT)}>
                        Rotate Left
                    </button>
                    <button className="gameButton" onClick={cb.bind(this, Input.ROTATE.RIGHT)}>
                        Rotate Right
                    </button>
                </div>
            </div>
        );
    }
}


export const Input = {
    MOVE: {
        LEFT: "move_left",
        DOWN: "move_down",
        RIGHT: "move_right"
    },
    ROTATE: {
        LEFT: "rotate_left",
        RIGHT: "rotate_right"
    }
};