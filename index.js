/** @format */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import Router from './src/router';

AppRegistry.registerComponent(appName, () => Router);
