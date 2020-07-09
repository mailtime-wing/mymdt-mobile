/**
 * @format
 */

import '@/polyfills';

import {AppRegistry, YellowBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings(['MailtimeAuth']);
AppRegistry.registerComponent(appName, () => App);
