/**
 * @format
 */

import '@/polyfills';

import * as Sentry from '@sentry/react-native';
import DeviceInfo from 'react-native-device-info';

import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

DeviceInfo.isEmulator().then((isEmulator) => {
  Sentry.init({
    dsn:
      'https://153b2968bc984e05913e5f119571ae9f@o93545.ingest.sentry.io/5547157',
    enableNative: !isEmulator,
  });
});

LogBox.ignoreLogs(['MailtimeAuth']);
AppRegistry.registerComponent(appName, () => App);
