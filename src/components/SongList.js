import React from 'react';
import { ScrollView, Text } from 'react-native';
import SongDetail from './SongDetail';

const SongList = props => {
  return (
    <ScrollView>
      <Text>Samples</Text>
      {props.samples.map(song => (
        <SongDetail key={song.id} songInfo={song} />
      ))}
    </ScrollView>
  );
};

export default SongList;
