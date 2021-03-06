import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Input, Form, Segment, Statistic } from 'semantic-ui-react';

import ReactPlayer from 'react-player';

import "../../node_modules/video-react/dist/video-react.css";

// const EXAMPLE_URL = 'https://www.youtube.com/watch?v=ysz5S6PUM-U';

//const SERVER_URL = 'localhost:3700';
const SERVER_URL = 'ws://watch-me-together.herokuapp.com';

class VideoPage extends Component {

  constructor(props) {
    super(props);
    const socket = socketIOClient(SERVER_URL); // connect to our server
    console.log('Client construct socket of url ', SERVER_URL);
    this.state = {
      socket: socket,
      playing: false,
      url: '',
      clientsNum: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


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

    // when client gets connected, send roomCode to server
    socket.on('connect', () => {
      socket.emit('join room', this.props.roomCode);
      console.log('Client sends roomCode to server', this.props.roomCode);
    });

    socket.on('room joined', (clientsNum) => {
      if (clientsNum !== this.state.clientsNum){
        this.setState({ clientsNum: clientsNum});
      }
    });

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
      <div>
        <Segment inverted>
          <Form inverted onSubmit={this.handleSubmit}>
            <Input fluid label="Put Youtube link here: " type="text" value={this.state.url} onChange={this.handleChange} action="走起"/>
          </Form>
          <Statistic inverted >
            <Statistic.Value>{this.state.clientsNum}</Statistic.Value>
            <Statistic.Label>Watching Now in Room {this.props.roomCode}</Statistic.Label>
          </Statistic>
        </Segment>

        <ReactPlayer
          ref={this.ref}
          url={this.state.url}
          width='100%'
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





export default VideoPage;
