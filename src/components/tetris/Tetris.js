import React from 'react';
import GameView from './GameView';
import GameStats from './GameStats';
import { GameInput, Input } from './GameInput';
import BoardController from './gamelogic/BoardController';
import GameController from './gamelogic/GameController';
import Config from './gamelogic/Config';


class Tetris extends React.Component{
    constructor(props){
		super(props);
		this.restart = this.restart.bind(this);
		this.onInput = this.onInput.bind(this);
		this.updateTimer = this.updateTimer.bind(this);
		this.gameTimer = this.gameTimer.bind(this);
		this.createInitialGameState = this.createInitialGameState.bind(this);
		this.startIntervals = this.startIntervals.bind(this);


		this.state = this.createInitialGameState();
		this.startIntervals();
	}

	/**
	 * Returns an object representing the game state at the very 
	 * beginning. 
	 */
	createInitialGameState(){
		return {
			playing: true,
			board: BoardController.createBoard(
				this.props.width, this.props.height
			),
			falling: GameController.createTetramino(
				Math.floor(this.props.width / 2)
			),
			time: 0,
			score: 0,
			level: 1
		};
	}

	/**
	 * Starts the game and time intervals
	 */
	startIntervals(){
		this.timeInterval = setInterval(this.updateTimer, 1000);
		this.gameInterval = setInterval(
			this.gameTimer, GameController.calculateGameTimer(1)
		);
	}

	/**
	 * Resets the state and intervals to their initial states.
	 */
	restart(){
		this.setState(this.createInitialGameState());
		clearInterval(this.timeInterval);		
		clearInterval(this.gameInterval);
		this.startIntervals();
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
	 * Increments the current level and makes the game timer faster, according 
	 * to the current level.
	 */
	incrementLevel(){
		let newLevel = this.state.level + 1;
		this.setState({
			level: newLevel
		});
		let newInterval = GameController.calculateGameTimer(newLevel);
		clearInterval(this.gameInterval);
		this.gameInterval = setInterval(this.gameTimer, newInterval);
	}

	/**
	 * Tries to move the current falling tetramino one block down, or blocks it
	 * if it can't go down more and sets another new tetramino as the falling 
	 * one.
	 */
	gameTimer(){
		const falling = this.state.falling;
		if( falling === undefined )	return;
		let newTetramino = GameController.moveTetramino(
			this.state.board, 
			falling,
			"down"
		);
		if( newTetramino !== falling ){
			this.setState({
				falling: newTetramino
			});
		} else {
			let board = BoardController.applyTetramino(
				this.state.board, falling
			);
			let cleared = BoardController.updateBoard(board);
			const rpl = Config.ROWS_PER_LEVEL;
			if( this.state.score % rpl + cleared >= rpl ){
				this.incrementLevel();
			}
			this.setState({
				falling: GameController.createTetramino(
					Config.BOARD.START_POINT
				),
				board: board,
				score: this.state.score + cleared
			});
			if( GameController.isGameOver(board) ){
				this.setState({
					playing: false
				});
				clearInterval(this.gameInterval);
				clearInterval(this.timeInterval);
			}
		}
	}

	/**
	 * Input handler for the game controls. This handles the inputs for 
	 * the "move" and "rotate" commands.
	 * @param {String} input: One of the constants defined in GameInput.Input
	 */
	onInput(input){
		let tetramino = this.state.falling;
		if( input === Input.MOVE.DOWN ){
            this.gameTimer();
            clearInterval(this.gameInterval);
            this.gameInterval = setInterval(
                this.gameTimer, 
                GameController.calculateGameTimer(this.state.level)
            );
		} else {
			if( input === Input.MOVE.LEFT || input === Input.MOVE.RIGHT ){
				let direction = input === Input.MOVE.LEFT ? "left" : "right";
				tetramino = GameController.moveTetramino(
					this.state.board, tetramino, direction
				);
			} else {
				let direction = input === Input.ROTATE.LEFT ? "left" :"right";
				tetramino = GameController.rotateTetramino(
					this.state.board, tetramino, direction
				);
			}
			this.setState({
				falling: tetramino
			});
		}
	}

	render(){
    	return (
    		<div className="App">
				<h1>
					{ this.state.playing? "Tetris!" : "Game Over!" }
				</h1>
				<GameView 
					board={this.state.board} 
					falling={this.state.falling} />
				<GameStats 
					score={this.state.score} 
					level={this.state.level}
					time={this.state.time} />
				<GameInput onInput={this.onInput} />
				<button onClick={this.restart}>
					Restart Game
				</button>
    		</div>
    	);
	}
}

export default Tetris;