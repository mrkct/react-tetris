import React, { Component } from 'react';

class GameStats extends Component {
    render() {
        return (
            <div className="gameStats">
                <p>
                    <strong>Score: {this.props.score}</strong><br></br>
                    <strong>Level: {this.props.level}</strong><br></br>
                    <strong>Time: {this.props.time} sec</strong><br></br>
                </p>
            </div>
        );
    }
}

export default GameStats;