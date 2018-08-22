import React, { Component } from 'react';
import WelcomePage from './pages/welcome.js';
import VideoPage from './pages/video.js';
import { Divider } from 'semantic-ui-react';

import logo from './logo.svg';
import './App.css';
import "../node_modules/video-react/dist/video-react.css";

// const EXAMPLE_URL = 'https://www.youtube.com/watch?v=ysz5S6PUM-U';


class App extends Component {

  constructor() {
    super();
    this.state = {
      joined: false,
      roomCode: ''
    }

    this.join_a_room = this.join_a_room.bind(this);
  }

  join_a_room(roomCode) {
    this.setState({
      joined: true,
      roomCode: roomCode
    });
    console.log("App.js: someone want to join", roomCode);
  }


  render() {

    return (
      <div className="App">
        {/* always have this header*/}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">我真是个小天才呀！</h1>
          <Divider inverted section />
        </header>

        {this.state.joined ? <VideoPage roomCode={this.state.roomCode}/>: <WelcomePage join_a_room={this.join_a_room}/>}

      </div>
    );
  }

}





export default App;
