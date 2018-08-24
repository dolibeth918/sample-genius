import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { Header } from './components/common';
import InputForm from './components/InputForm';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Header headerText="Samplr" />
          <InputForm />
        </View>
      </Provider>
    );
  }
}

export default App;
