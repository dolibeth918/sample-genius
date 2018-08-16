import React, { Component } from 'react';
import axios from 'axios';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Button, Card, CardSection, Input } from './common';
import SongDetail from './SongDetail';
import SongList from './SongList';

class InputForm extends Component {
  state = { songs: [], songInfo: {}, song: '' };

  //this will turn the song being searched into a query format
  querySong(song) {
    const splitSong = song.split(' ');
    return splitSong.join('%20');
  }

  onButtonPress() {
    const { song } = this.state;
    const queryString = this.querySong(song);
    axios.get(`https://genius.com/api/search?q=${queryString}`).then(res => {
      return this.setState({ songs: res.data.response.hits, songInfo: {} });
    });
  }

  onSongPress(selectedSong) {
    axios
      .get(`https://genius.com/api${selectedSong.result.api_path}`)
      .then(res => this.setState({ songInfo: res.data.response.song }));
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

        {this.state.songs.length > 0 &&
          !this.state.songInfo.api_path && (
            <ScrollView>
              {this.state.songs.map(song => {
                return (
                  <TouchableOpacity
                    key={song.id}
                    onPress={this.onSongPress.bind(this, song)}
                  >
                    <SongDetail key={song.id} songInfo={song.result} />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}

        {this.state.songInfo.api_path && (
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
