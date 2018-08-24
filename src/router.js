import React from 'react';
import { AppRegistry, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './App';

const Router = StackNavigator({
  Home: { screen: Home }
});
export default Router;
