import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from './components/common';
import InputForm from './components/InputForm';

class App extends Component {
  render() {
    return (
      <View>
        <Header headerText="Sample Genius" />
        <InputForm />
      </View>
    );
  }
}

export default App;
