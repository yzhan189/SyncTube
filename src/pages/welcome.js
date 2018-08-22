import React, { Component } from 'react';
import { Card, Button, Form, Input } from 'semantic-ui-react';

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generatedRoomCode: '',
      roomCode: '',
      generated: false
    };

    this.handle_code_submit = this.handle_code_submit.bind(this);
    this.handle_code_change = this.handle_code_change.bind(this);

    this.handle_generate_code = this.handle_generate_code.bind(this);
    this.handle_copy_code = this.handle_copy_code.bind(this);
  }

  handle_code_submit (event) {
    console.log('Welcome.js: received room code: ', this.state.roomCode);

    // TODO error handle: if code not found (connect to database)
    if (true){
      this.props.join_a_room(this.state.roomCode);
    }
  }

  handle_code_change (event) {
    this.setState({ roomCode: event.target.value });
  }

  handle_generate_code (event) {
    this.setState({
      generated: true,
      generatedRoomCode: Math.random().toString(36).substring(2)
    });
  }

  handle_copy_code (event) {
    console.log('Welcome.js: try to copy to clipboard:', this.state.roomCode);

    const copyText = document.getElementById("generatedRoomCode");

    copyText.select();

    document.execCommand("copy");

    alert("Copied the room code: " + copyText.value);
  }


  render() {
    return (
        <Card.Group centered>
          <Card>
            <Card.Content>
              <Card.Header>Start a new room</Card.Header>
              <Card.Description>
                Generate a code to share with other audiences.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div>
                {/* copy and paste function */}
                {
                  this.state.generated ?
                  <Input
                    fluid
                    id={'generatedRoomCode'}
                    action={{ color: 'teal', labelPosition: 'right', icon: 'copy', content: 'Copy', onClick: this.handle_copy_code }}
                    value={this.state.generatedRoomCode}
                  /> :
                  <Button basic color='green' onClick={this.handle_generate_code}>Generate Room Code</Button>
                }
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content>
              <Card.Header>Join an existing room</Card.Header>
              <Card.Description>
                Join other audiences with room code.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div >
                <Input
                  fluid
                  action={ <Button type='submit' onClick={this.handle_code_submit}>Join</Button> }
                  placeholder='Find by room code...'
                  value={this.state.roomCode} onChange={this.handle_code_change}
                />
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
    );
  }
}

export default WelcomePage;