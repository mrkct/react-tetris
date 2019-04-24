import React, { Component } from 'react';
import GameView from './GameView';
import GameStats from './GameStats';
import './App.css';
import BoardController from './game/BoardController';
import Tetramino from './game/Tetramino';


class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			board: BoardController.createBoard(10, 16),
			current_piece: {
				type: Tetramino.BLOCK,
				x: 3,
				y: 0,
			},
			time: 0,
			score: 0,
			level: 1
		};
		this.timeInterval = setInterval(this.updateTimer.bind(this), 1000);
		this.gameInterval = setInterval(this.movePiece.bind(this), 50);
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
	movePiece(){
		const current = this.state.current_piece;
		let isPositionFree = BoardController.isPositionFree(
			this.state.board,
			current.x,
			current.y + 1,
			current.type
		);

		if( isPositionFree ){
			this.setState({
				current_piece: {
					type: current.type,
					x: current.x,
					y: current.y + 1
				}
			});
		} else {
			let board = BoardController.applyPiece(
				this.state.board, 
				current.x, 
				current.y, 
				current.type
			);
			let cleared = BoardController.updateBoard(board);
			this.setState({
				current_piece: {
					x: Math.floor(Math.random() * 10),
					y: 0,
					type: Tetramino["STRAIGHT"]
				},
				board: board,
				score: this.state.score + cleared
			});
		}
	}

	render(){
    	return (
    		<div className="App">
				<GameView board={this.state.board} />
				<GameStats 
					score={this.state.score} 
					level={this.state.level}
					time={this.state.time} />
    		</div>
    	);
	}
}

export default App;
