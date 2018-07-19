import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import { Player } from 'video-react';
import ReactPlayer from 'react-player';

import logo from './logo.svg';
import './App.css';
import "../node_modules/video-react/dist/video-react.css";

const EXAMPLE_URL = 'https://www.youtube.com/watch?v=ysz5S6PUM-U';

class App extends Component {

  constructor() {
    super();
    const socket = socketIOClient("http://localhost:3700"); // connect to our server
    this.state = {
      socket: socket,
      playing: false,
      url: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }



  // componentDidMount() {
  //   // subscribe state change
  //   this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  // }
  // handleStateChange(state, prevState) {
  //   if (state.paused !== prevState.paused || state.seeking){ // waiting is included
  //
  //     const socket = this.state.socket;
  //     console.log("pause", state.paused, "seeking", state.seeking, state.currentTime, state.seekingTime);
  //
  //     if (state.seeking){ // jump to that time
  //       socket.emit('seek', state.currentTime);
  //       console.log('Client request to seek to ', state.currentTime);
  //     }
  //     if (state.paused !== prevState.paused){
  //       socket.emit('pause', state.paused);
  //       console.log('Client request to ', state.paused ? 'pause' : 'play');
  //
  //     }
  //   }
  // }



  // when starts playing or resuming
  onPlay = () => {
    this.setState({ playing: true });
    const socket = this.state.socket;
    socket.emit('youtube play/seek', this.player.getCurrentTime());

    console.log('Client request to play/seek at ', this.player.getCurrentTime());
  }
  onPause = () => {
    this.setState({playing: false});
    const socket = this.state.socket;
    socket.emit('youtube pause');

    console.log('Client request to pause');
  }

  ref = player => {
    this.player = player
  }


  handleSubmit(event){
    event.preventDefault();
    const socket = this.state.socket;
    socket.emit('youtube url', this.state.url);
    console.log('Client request to load url, ', this.state.url);
  }
  handleChange(event){
    this.setState({ url: event.target.value });
  }



  render() {
    // catch event from server
    const socket = this.state.socket;

    // socket.on('pause', (pause) => {
    //   if (pause) this.refs.player.pause();
    //   else this.refs.player.play();
    //   console.log('Client execute ', pause ? 'pause' : 'play');
    // });
    // socket.on('seek', (time) => {
    //   this.refs.player.seek(time);
    //   console.log('Client execute seek to', time);
    // });



    socket.on('youtube pause', () => {
      // only execute when it is playing
      if (this.state.playing){
        this.setState({ playing: false });
        console.log('Client execute pause');
      }
    });
    socket.on('youtube play/seek', (time) => {
      if (!this.state.playing){
        this.setState({ playing: true });
        this.player.seekTo(parseFloat(time));
        console.log('Client execute play/seek to ', time);
      }
    });
    socket.on('youtube url', (url) => {
      if (this.state.url !== url) {
        this.setState({ url: url });
        console.log('Client execute to load url: ', url);
      }
    });




    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">我真是个小天才呀！</h1>
        </header>

        {/*<Player ref="player">*/}
          {/*<source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />*/}
        {/*</Player>*/}

        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Put Youtube link here:
              <input type="text" value={this.state.url} onChange={this.handleChange} />
            </label>
            <input type="submit" value="走起" />
          </form>

        </div>



        <ReactPlayer
          ref={this.ref}
          url={this.state.url}
          width='100%'
          height='100%'
          playing={this.state.playing}
          seeking={this.state.seeking}
          controls={true}
          onPlay={this.onPlay}
          onPause={this.onPause}
        />

      </div>
    );
  }

}





export default App;
