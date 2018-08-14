import React, { Component } from 'react';
import { Button, Card, CardSection, Input } from './common';

class InputForm extends Component {
  state = { text: '' };

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder={'Enter song name'}
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
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
