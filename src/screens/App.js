import React, { Component } from 'react';
import './App.css';
import Tetris from '../components/tetris/Tetris';


class App extends Component{
	render(){
    	return (
    		<div className="App">
				<Tetris width={10} height={16} />
    		</div>
    	);
	}
}

export default App;