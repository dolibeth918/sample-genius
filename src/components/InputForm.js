import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, CardSection, Input } from './common';
import SongDetail from './SongDetail';
import SongList from './SongList';

class InputForm extends Component {
  state = { song: '', songPath: '', songInfo: {} };

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
      .then(res => {
        const songPath = res.data.response.hits[0].result.api_path;
        return this.setState({ songPath });
      })
      .then(() => {
        return axios.get(`https://genius.com/api${this.state.songPath}`);
      })
      .then(res => this.setState({ songInfo: res.data.response.song }));
  }

  render() {
    console.log(this.state.songInfo);
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
        {this.state.songInfo.album && (
          <CardSection>
            <SongDetail songInfo={this.state.songInfo} />
          </CardSection>
        )}
        {this.state.songInfo.album && (
          <CardSection>
            <SongList
              samples={this.state.songInfo.song_relationships[0].songs}
            />
          </CardSection>
        )}
      </Card>
    );
  }
}

export default InputForm;
