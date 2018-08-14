import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from './components/common';
import InputForm from './components/InputForm';

class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headerText="Sample Genius" />
        {/*EVENTUALLY, I WANT TO ADD REDUX SO THAT A CAN CONDITIONALLY RENDER INPUT FORM VS LIST OF SONGS HERE, SINCE I CANT PASS THE SONGS GENERATED FROM INPUT FORM TO SONG LIST UNLESS I RENDER INPUT FORM IN SONG LIST */}
        <InputForm />
      </View>
    );
  }
}

export default App;
