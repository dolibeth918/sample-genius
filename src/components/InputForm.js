import React, { Component } from 'react';
import { Button, Card, CardSection, Input } from './common';

class InputForm extends Component {
  state = { song: '' };

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder={'Enter song name'}
            value={this.state.song}
            onChangesong={song => this.setState({ song })}
          />
        </CardSection>
        <CardSection>
          <Button>Search</Button>
        </CardSection>
      </Card>
    );
  }
}

export default InputForm;
