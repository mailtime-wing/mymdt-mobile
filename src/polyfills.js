import 'react-native-url-polyfill/auto';

/**
 * This is polyfill required by `Intl` (which comes from `react-intl`)
 * TODO: check the following
 * 1. zh-Hant and zh-Hans are required
 * 2. all polyfills required
 *
 * references:
 * https://github.com/andyearnshaw/Intl.js
 * https://formatjs.io/docs/react-intl/#react-native
 * https://formatjs.io/docs/react-intl/#runtime-requirements
 */
if (!global.Intl) {
  global.Intl = require('intl');
  require('intl/locale-data/jsonp/en');
}
