import {Platform} from 'react-native';

const theme = {
  colors: {
    primary: ['#0363EF', '#0036C5'],
    secondary: ['#B5E8EE', '#21CEDB', '#00BACE', '#1E7884'],
    blue: ['rgba(3, 99, 239, 0.1)'],
    error: [
      'rgba(216, 16, 16, 0.1)',
      'rgba(216, 16, 16, 0.6)',
      '#E95959',
      '#D81010',
    ],
    alert: '#FFD542',
    grey: ['#EEEEEE', '#DFDFDF', '#C6C6C6', '#AAAAAA', '#7B7B7B', '#797979'],
    white: ['#FFFFFF', '#F2F2F2'],
    black: [
      'rgba(0, 0, 0, 0.05)',
      'rgba(0, 0, 0, 0.4)',
      'rgba(0, 0, 0, 0.6)',
      '#000000',
    ],
    gold: '#FFDF6F',
    membership: {
      basic: ['#000000', '#FFFFFF'],
      silver: ['#EAEAEA', '#707070'],
      gold: ['#FFDC22', '#8F722E'],
      platinum: ['#DFE3EB', '#466C8E'],
      diamond: ['#DCF3F4', '#417296'],
      special: ['#0363EF', '#FFFFFF'],
    },
  },
  fonts: {
    body: 'Inter',
    heading: Platform.OS === 'ios' ? 'Neo Sans Pro' : 'Neo Sans Pro Medium',
  },
  fontSizes: [10, 12, 14, 16, 18, 20, 24, 30, 36],
  fontWeights: [400, 500, 600, 700],
};

theme.colors.grey.superLight = theme.colors.grey[0];
theme.colors.grey.light = theme.colors.grey[1];
theme.colors.grey.normal = theme.colors.grey[2];
theme.colors.grey.dark = theme.colors.grey[3];
theme.colors.grey.superDark = theme.colors.grey[4];
theme.colors.grey.extremeDark = theme.colors.grey[5];
theme.colors.white.normal = theme.colors.white[0];
theme.colors.white.dark = theme.colors.white[1];
theme.colors.black.extremeLight = theme.colors.black[0];
theme.colors.black.superLight = theme.colors.black[1];
theme.colors.black.light = theme.colors.black[2];
theme.colors.black.normal = theme.colors.black[3];

theme.colors.primary.normal = theme.colors.primary[0];
theme.colors.primary.dark = theme.colors.primary[1];
theme.colors.secondary.light = theme.colors.secondary[0];
theme.colors.secondary.normal = theme.colors.secondary[1];
theme.colors.secondary.dark = theme.colors.secondary[2];
theme.colors.secondary.superDark = theme.colors.secondary[3];
theme.colors.blue.light = theme.colors.blue[0];
theme.colors.error.superLight = theme.colors.error[0];
theme.colors.error.light = theme.colors.error[1];
theme.colors.error.normal = theme.colors.error[2];
theme.colors.error.dark = theme.colors.error[3];

theme.colors.membership.basic.background = theme.colors.membership.basic[0];
theme.colors.membership.basic.text = theme.colors.membership.basic[1];
theme.colors.membership.silver.background = theme.colors.membership.silver[0];
theme.colors.membership.silver.text = theme.colors.membership.silver[1];
theme.colors.membership.gold.background = theme.colors.membership.gold[0];
theme.colors.membership.gold.text = theme.colors.membership.gold[1];
theme.colors.membership.platinum.background =
  theme.colors.membership.platinum[0];
theme.colors.membership.platinum.text = theme.colors.membership.platinum[1];
theme.colors.membership.diamond.background = theme.colors.membership.diamond[0];
theme.colors.membership.diamond.text = theme.colors.membership.diamond[1];
theme.colors.membership.special.background = theme.colors.membership.special[0];
theme.colors.membership.special.text = theme.colors.membership.special[1];

theme.fonts.pageTitle = theme.fonts.heading;
theme.fonts.heading1 = theme.fonts.heading;
theme.fonts.heading2 = theme.fonts.heading;
theme.fonts.heading3 = theme.fonts.heading;
theme.fonts.heading4 = theme.fonts.heading;
theme.fonts.heading5 = theme.fonts.heading;
theme.fonts.subTitle1 = theme.fonts.heading;
theme.fonts.subTitle2 = theme.fonts.heading;
theme.fonts.body1 = theme.fonts.body;
theme.fonts.body2 = theme.fonts.body;
theme.fonts.caption = theme.fonts.body;
theme.fonts.value = theme.fonts.body;
theme.fonts.button = theme.fonts.body;
theme.fonts.label = theme.fonts.body;
theme.fonts.overline = theme.fonts.body;
theme.fontSizes.pageTitle = theme.fontSizes[8];
theme.fontSizes.heading1 = theme.fontSizes[8];
theme.fontSizes.heading2 = theme.fontSizes[7];
theme.fontSizes.heading3 = theme.fontSizes[6];
theme.fontSizes.heading4 = theme.fontSizes[5];
theme.fontSizes.heading5 = theme.fontSizes[4];
theme.fontSizes.subTitle1 = theme.fontSizes[4];
theme.fontSizes.subTitle2 = theme.fontSizes[3];
theme.fontSizes.body1 = theme.fontSizes[3];
theme.fontSizes.body2 = theme.fontSizes[2];
theme.fontSizes.caption = theme.fontSizes[1];
theme.fontSizes.value = theme.fontSizes[3];
theme.fontSizes.button = theme.fontSizes[2];
theme.fontSizes.label = theme.fontSizes[1];
theme.fontSizes.overline = theme.fontSizes[0];
theme.fontWeights.pageTitle = theme.fontWeights[1];
theme.fontWeights.heading1 = theme.fontWeights[1];
theme.fontWeights.heading2 = theme.fontWeights[1];
theme.fontWeights.heading3 = theme.fontWeights[1];
theme.fontWeights.heading4 = theme.fontWeights[1];
theme.fontWeights.heading5 = theme.fontWeights[1];
theme.fontWeights.subTitle1 = theme.fontWeights[2];
theme.fontWeights.subTitle2 = theme.fontWeights[2];
theme.fontWeights.body1 = theme.fontWeights[0];
theme.fontWeights.body2 = theme.fontWeights[0];
theme.fontWeights.caption = theme.fontWeights[0];
theme.fontWeights.value = theme.fontWeights[2];
theme.fontWeights.button = theme.fontWeights[2];
theme.fontWeights.label = theme.fontWeights[3];
theme.fontWeights.overline = theme.fontWeights[2];

theme.lineHeights.pageTitle = theme.fontSizes.pageTitle * 1.25;
theme.lineHeights.heading1 = theme.fontSizes.heading1 * 1.25;
theme.lineHeights.heading2 = theme.fontSizes.heading2 * 1.25;
theme.lineHeights.heading3 = theme.fontSizes.heading3 * 1.25;
theme.lineHeights.heading4 = theme.fontSizes.heading4 * 1.25;
theme.lineHeights.heading5 = theme.fontSizes.heading5 * 1.25;
theme.lineHeights.subTitle1 = theme.fontSizes.subTitle1 * 1.25;
theme.lineHeights.subTitle2 = theme.fontSizes.subTitle2 * 1.25;
theme.lineHeights.body1 = theme.fontSizes.body1 * 1.5;
theme.lineHeights.body2 = theme.fontSizes.body2 * 1.5;
theme.lineHeights.caption = theme.fontSizes.caption * 1.5;
theme.lineHeights.value = theme.fontSizes.value * 1.5;
theme.lineHeights.button = theme.fontSizes.button * 1.5;
theme.lineHeights.label = theme.fontSizes.label * 1.5;
theme.lineHeights.overline = theme.fontSizes.overline * 1.5;

export default theme;
