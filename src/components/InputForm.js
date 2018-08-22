import React, { Component } from 'react';
import axios from 'axios';
import { TouchableOpacity, ScrollView, Linking, Platform } from 'react-native';
import { Button, Card, CardSection, Input } from './common';
import SongDetail from './SongDetail';
import SongList from './SongList';

class InputForm extends Component {
  state = { songs: [], songInfo: {}, song: '', accessToken: '' };
  static navigationOptions = {
    title: 'Home'
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  handleOpenURL = event => {
    this.navigate(event.url);
  };
  navigate = url => {
    // E
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    let [routeName, accessToken] = route.split('?');
    accessToken = accessToken.split('=')[1];
    this.setState({ accessToken });
    if (routeName === 'Home') {
      navigate('Home');
    }
  };

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
    console.log('logging the state', this.state);
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
        <CardSection>
          <Button
            onPress={() => Linking.openURL('http://localhost:8080/login')}
          >
            Log In with Spotify
          </Button>
        </CardSection>
      </Card>
    );
  }
}

export default InputForm;
