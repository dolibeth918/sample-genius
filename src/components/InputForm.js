import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, CardSection, Input } from './common';

class InputForm extends Component {
  state = { song: '' };

  //this will turn the song being searched into a query format
  querySong(song) {
    const splitSong = song.split(' ');
    return splitSong.join('%20');
  }

  onButtonPress() {
    const { song } = this.state;
    const queryString = this.querySong(song);
    axios
      .get(`https://genius.com/api/search?q=${queryString}`)
      .then(res => res.data);
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder={'Enter song name'}
            value={this.state.song}
            onChangeText={song => this.setState({ song })}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Search</Button>
        </CardSection>
      </Card>
    );
  }
}

export default InputForm;
