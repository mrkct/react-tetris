import React, { Component } from 'react';
import GameView from './GameView';
import GameStats from './GameStats';
import './App.css';
import BoardController from './game/BoardController';
import GameController from './game/GameController';


class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			board: BoardController.createBoard(10, 16),
			tetramino: GameController.createTetramino(4),
			time: 0,
			score: 0,
			level: 1
		};
		this.timeInterval = setInterval(this.updateTimer.bind(this), 1000);
		this.gameInterval = setInterval(this.moveTetramino.bind(this), 50);
	}

	/**
	 * Updates the in-game timer every second.
	 */
	updateTimer(){
		this.setState({
			time: this.state.time + 1
		});
	}

	/**
	 * Moves the current
	 */
	moveTetramino(){
		const tetramino = this.state.tetramino;
		if( tetramino === undefined )	return;
		let newTetramino = GameController.moveTetramino(
			this.state.board, 
			tetramino
		);
		if( newTetramino !== tetramino ){
			this.setState({
				tetramino: newTetramino
			});
		} else {
			let board = BoardController.applyTetramino(
				this.state.board, tetramino
			);
			let cleared = BoardController.updateBoard(board);
			this.setState({
				tetramino: GameController.createTetramino(
					Math.floor(Math.random() * (board[0].length-2))
				),
				board: board,
				score: this.state.score + cleared
			});
		}
	}

	render(){
    	return (
    		<div className="App">
				<GameView 
					board={this.state.board} 
					falling={this.state.tetramino} />
				<GameStats 
					score={this.state.score} 
					level={this.state.level}
					time={this.state.time} />
    		</div>
    	);
	}
}

export default App;
