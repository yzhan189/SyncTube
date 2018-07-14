import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import { Player } from 'video-react';

import logo from './logo.svg';
import './App.css';
import "../node_modules/video-react/dist/video-react.css";

class App extends Component {

  constructor() {
    super();
    const socket = socketIOClient("http://localhost:3700"); // connect to our server
    this.state = {
      socket: socket,
    }
  }


  componentDidMount() {
    // subscribe state change
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }
  handleStateChange(state, prevState) {
    if (state.paused !== prevState.paused || state.seeking){ // waiting is included

      const socket = this.state.socket;
      console.log("pause", state.paused, "seeking", state.seeking, state.currentTime, state.seekingTime);

      if (state.seeking){ // jump to that time
        socket.emit('seek', state.currentTime);
        console.log('Client request to seek to ', state.currentTime);
      }
      if (state.paused !== prevState.paused){
        socket.emit('pause', state.paused);
        console.log('Client request to ', state.paused ? 'pause' : 'play');

      }

    }



  }



  render() {
    // catch event from server
    const socket = this.state.socket;

    socket.on('pause', (pause) => {
      if (pause) this.refs.player.pause();
      else this.refs.player.play();
      console.log('Client execute ', pause ? 'pause' : 'play');
    });

    socket.on('seek', (time) => {
      this.refs.player.seek(time);
      console.log('Client execute seek to', time);
    });


    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">我真是个小天才呀！</h1>
        </header>

        <Player ref="player">
          <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
        </Player>

      </div>
    );
  }

}





export default App;
