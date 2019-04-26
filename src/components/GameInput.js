import React, { Component } from 'react';


class GameInput extends Component{
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