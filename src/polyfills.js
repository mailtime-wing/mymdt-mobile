import 'react-native-url-polyfill/auto';
import {shouldPolyfill as shouldPolyfillGetCanonicalLocales} from '@formatjs/intl-getcanonicallocales/should-polyfill';
import {shouldPolyfill as shouldPolyfillLocale} from '@formatjs/intl-locale/should-polyfill';
import {shouldPolyfill as shouldPolyfillPluralRules} from '@formatjs/intl-pluralrules/should-polyfill';
import {shouldPolyfill as shouldPolyfillNumberFormat} from '@formatjs/intl-numberformat/should-polyfill';
import {shouldPolyfill as shouldPolyfillDateTimeFormat} from '@formatjs/intl-datetimeformat/should-polyfill';
import * as RNLocalize from 'react-native-localize';

/**
 * This is polyfill required for `Intl` (which is required by `react-intl`)
 * TODO: check the followings
 * 1. if using zh locale data is enough or if we need to use zh-Hant-XX/zh-Hans-XX
 * 2. if we should use dynamic import based on locale
 *
 * references:
 * https://formatjs.io/docs/react-intl/#react-native
 * https://formatjs.io/docs/react-intl/#runtime-requirements
 */

if (!global.Intl) {
  global.Intl = {};
}

if (shouldPolyfillGetCanonicalLocales()) {
  require('@formatjs/intl-getcanonicallocales/polyfill');
}

if (shouldPolyfillLocale()) {
  require('@formatjs/intl-locale/polyfill');
}

if (shouldPolyfillPluralRules()) {
  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/locale-data/en');
  require('@formatjs/intl-pluralrules/locale-data/zh');
}

if (shouldPolyfillNumberFormat()) {
  require('@formatjs/intl-numberformat/polyfill');

  if (global.Intl.NumberFormat.polyfilled) {
    require('@formatjs/intl-numberformat/locale-data/en-US');
    require('@formatjs/intl-numberformat/locale-data/zh');
  }
}

if (shouldPolyfillDateTimeFormat()) {
  require('@formatjs/intl-datetimeformat/polyfill');

  if (Intl.DateTimeFormat.polyfilled) {
    require('@formatjs/intl-datetimeformat/add-all-tz');

    require('@formatjs/intl-datetimeformat/locale-data/en-US');
    require('@formatjs/intl-datetimeformat/locale-data/zh');
  }

  if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {
    Intl.DateTimeFormat.__setDefaultTimeZone(RNLocalize.getTimeZone());
  }
}
