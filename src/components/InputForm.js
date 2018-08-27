import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, Linking, Platform } from 'react-native';
import { connect } from 'react-redux';

import { Button, Card, CardSection, Input } from './common';
import SongDetail from './SongDetail';
import SongList from './SongList';
import { fetchSongs } from '../redux/songs';
import { fetchSongInfo } from '../redux/song';

class InputForm extends Component {
  state = { song: '', accessToken: '' };
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
    this.props.fetchSongs(queryString);
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

        {this.props.songs.length > 0 &&
          !this.props.songInfo.api_path && (
            <ScrollView>
              {this.props.songs.map(song => {
                return (
                  <TouchableOpacity
                    key={song.id}
                    onPress={this.props.selectSong.bind(this, song)}
                  >
                    <SongDetail key={song.id} songInfo={song.result} />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}

        {this.props.songInfo.api_path && (
          <CardSection>
            <SongList
              samples={this.props.songInfo.song_relationships[0].songs}
            />
          </CardSection>
        )}
        {!this.state.accessToken && (
          <CardSection>
            <Button
              onPress={() => Linking.openURL('http://localhost:8080/login')}
            >
              Log In with Spotify
            </Button>
          </CardSection>
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return { songs: state.songs, songInfo: state.song };
};

const mapDispatchToProps = dispatch => ({
  fetchSongs: searchStr => {
    dispatch(fetchSongs(searchStr));
  },
  selectSong: song => {
    dispatch(fetchSongInfo(song));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputForm);
