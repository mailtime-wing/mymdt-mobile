import {Platform} from 'react-native';

export const darkTheme = {
  colors: {
    // main theme
    primary: ['#9FBDE9', '#9FBDE9', 'rgba(159, 189, 233, 0.2)'],
    secondary: [
      '#88D9DE',
      '#88D9DE',
      '#88D9DE',
      'rgba(136, 217, 222, 0.2)',
      'rgba(136, 217, 222, 0.24)',
    ],
    contrastColor: '#FFFFFF',

    // text
    textOfMrp: '#88D9DE',
    textOfMdt: '#9FBDE9',
    nameOnMrpCard: '#88D9DE',
    nameOnMdtCard: '#9FBDE9',
    mrpCard: 'rgba(135, 218, 222, 0.24)',
    mdtCard: 'rgba(159, 189, 233, 0.24)',
    mrpCardValue: 'rgba(255, 255, 255, 0.87)',
    mdtCardValue: 'rgba(255, 255, 255, 0.87)',
    textOnError: [
      '#FF7171',
      'rgba(255, 113, 113, 0.7)',
      'rgba(255, 113, 113, 0.16)',
    ],
    textOnBackground: [
      'rgba(255, 255, 255, 0.87)',
      'rgba(255, 255, 255, 0.6)',
      'rgba(255, 255, 255, 0.38)',
    ],
    textOnThemeBackground: [
      'rgba(255, 255, 255, 0.87)',
      'rgba(255, 255, 255, 0.6)',
    ],

    // background
    background: [
      '#121212',
      'rgba(255, 255, 255, 0.12)',
      'rgba(255, 255, 255, 0.2)',
    ],
    elevatedBackground: [
      'background-color: #1E1E1E;',
      'background-color: #232323;',
      'background-color: #2C2C2C;',
      'background-color: #363636;',
    ],
    elevatedThemeBackground: [
      'background-color: #232323;',
      'background-color: #232323;',
    ],
    inputFocusBackground: 'rgba(159, 189, 233, 0.2)',
    errorBackground: 'rgba(255, 113, 113, 0.2)',
    themeBackground: '#121212',

    // membership (background, color, border, gradient)
    membership: {
      newbie: [
        '#121212',
        'rgba(255, 255, 255, 0.87)',
        'rgba(255, 255, 255, 0.08)',
        ['#121212', '#121212'],
      ],
      starter: ['#88D9DE', '#121212', '', ['#005A5F', '#003234']],
      extra: ['#9FBDE9', '#121212', '', ['#003A8F', '#002862']],
      elite: ['#DBDBDB', '#454545', '', ['#656565', '#363636']],
      infinite: ['#ECDCBC', '#6F5D40', '', ['#745A00', '#292300']],
      infinite_privilege: [
        '#000000',
        '#FFFFFF',
        '#FFFFFF',
        ['#575757', '#313131'],
      ],
    },

    // button
    buttonContrastBorderColor: 'rgba(136, 217, 222, 0.2)',
    buttonContrastTextColor: '#88D9DE',

    toggleOn: ['#88D9DE', 'rgba(136, 217, 222, 0.38)'],
    toggleOff: ['rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.38)'],

    // logo
    logo: {
      plaid: 'rgba(255, 255, 255, 0.87)',
    },

    unknownCard: ['#252525', '#777777', '#363636'],

    // others
    borderColor: 'rgba(255, 255, 255, 0.2)',
    contrastBorderColor: 'rgba(18, 18, 18, 0.2)',

    linearGradientBackground: ['#121212', '#121212'],
    tabScreenStatusBar: '#121212',

    system_theme: '#121212',

    alert: '#FFD542',

    rewardCircleBackground: '#464646',

    avatarsInitials: [
      '#F19898',
      '#F4C395',
      '#F4C395',
      '#D1E6A4',
      '#A0D79C',
      '#8EDAC8',
      '#93CAD1',
      '#8EB2DD',
      '#A59BDF',
      '#BE99CF',
      '#DFA4C0',
      '#B89D97',
    ],
  },
  fonts: {
    body: 'Inter',
    heading: Platform.OS === 'ios' ? 'Neo Sans Pro' : 'Neo Sans Pro Medium',
  },
  fontSizes: [10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 11],
  fontWeights: [400, 500, 600, 700],
  lineHeights: {},
};

export const lightTheme = {
  colors: {
    // main theme
    primary: ['#0363EF', '#0036C5', 'rgba(3, 99, 239, 0.05)'],
    secondary: [
      '#21CEDB',
      '#ABEBEE',
      '#00BACE',
      'rgba(33, 206, 219, 0.2)',
      '#E9FAFB',
    ],
    contrastColor: '#000000',

    // text
    textOfMrp: '#1E7884',
    textOfMdt: '#0036C5',
    nameOnMrpCard: '#FFFFFF',
    nameOnMdtCard: '#FFFFFF',
    mrpCard: '#21CEDB',
    mdtCard: '#0363EF',
    mrpCardValue: '#FFFFFF',
    mdtCardValue: '#FFFFFF',
    textOnError: [
      '#D81010',
      'rgba(216, 16, 16, 0.6)',
      'rgba(216, 16, 16, 0.1)',
    ],
    textOnBackground: [
      'rgba(0, 0, 0, 0.8)',
      'rgba(0, 0, 0, 0.6)',
      'rgba(0, 0, 0, 0.4)',
    ],
    textOnThemeBackground: ['#FFFFFF', '#FFFFFF'],

    // background
    background: ['#FFFFFF', 'rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.1)'],
    elevatedBackground: [
      'background-color: #FFFFFF;',
      'background-color: #FFFFFF; box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);',
      'background-color: #FFFFFF; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);',
      'background-color: #FFFFFF; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);',
    ],
    elevatedThemeBackground: [
      'background-color: #FFFFFF; box-shadow: 0px 4px 8px rgba(11, 142, 157, 0.1);',
      'background-color: #FFFFFF; box-shadow: 0px 4px 8px rgba(3, 99, 239, 0.1);',
    ],
    inputFocusBackground: 'rgba(3, 99, 239, 0.05)',
    errorBackground: 'rgba(216, 16, 16, 0.1)',
    themeBackground: '#21CEDB',

    // membership (background, color, border, gradient)
    membership: {
      newbie: ['#000000', '#FFFFFF', '#000000', ['#FAFAFA', '#F2F2F2']],
      starter: ['#00BACE', '#FFFFFF', '', ['#ABEBEE', '#E6FEFF']],
      extra: ['#0363EF', '#FFFFFF', '', ['#C9DFFF', '#EAF2FF']],
      elite: ['#EAEAEA', '#707070', '', ['#DEDEDE', '#F7F7F7']],
      infinite: ['#FFDC22', '#8F722E', '', ['#EEDBBA', '#FFF8EC']],
      infinite_privilege: ['#000000', '#FFFFFF', '', ['#A3A3A3', '#F2F2F2']],
    },

    // button
    buttonContrastBorderColor: 'rgba(255, 255, 255, 0.4)',
    buttonContrastTextColor: '#FFFFFF',

    toggleOn: ['#FFFFFF', '#21CEDB'],
    toggleOff: ['rgba(255, 255, 255, 0.87)', 'rgba(0, 0, 0, 0.1)'],

    // logo
    logo: {
      plaid: '#111111',
    },

    unknownCard: ['#F2F2F2', '#919191', '#E6E6E6'],

    // others
    borderColor: 'rgba(0, 0, 0, 0.2)',
    contrastBorderColor: 'rgba(255, 255, 255, 0.2)',

    linearGradientBackground: ['#FDFBF2', '#E2FAFF'],
    tabScreenStatusBar: '#FDFBF2',

    system_theme: '#F4F4F4',

    alert: '#FFD542',

    rewardCircleBackground: '#FFFFFF',

    avatarsInitials: [
      '#F15454',
      '#F88E2D',
      '#FDCC1E',
      '#9CD81C',
      '#42C936',
      '#26D6AB',
      '#1CD1EA',
      '#328BF4',
      '#7766E2',
      '#AD41E0',
      '#EC4696',
      '#8B5F55',
    ],
  },
  fonts: {
    body: 'Inter',
    heading: Platform.OS === 'ios' ? 'Neo Sans Pro' : 'Neo Sans Pro Medium',
  },
  fontSizes: [10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 11],
  fontWeights: [400, 500, 600, 700],
  lineHeights: {},
};

// main theme
lightTheme.colors.primary.normal = lightTheme.colors.primary[0];
lightTheme.colors.primary.dark = lightTheme.colors.primary[1];
lightTheme.colors.primary.border = lightTheme.colors.primary[2];

lightTheme.colors.secondary.normal = lightTheme.colors.secondary[0];
lightTheme.colors.secondary.light = lightTheme.colors.secondary[1];
lightTheme.colors.secondary.dark = lightTheme.colors.secondary[2];
lightTheme.colors.secondary.border = lightTheme.colors.secondary[3];
lightTheme.colors.secondary.superLight = lightTheme.colors.secondary[4];

// text
lightTheme.colors.textOnError.normal = lightTheme.colors.textOnError[0];
lightTheme.colors.textOnError.light = lightTheme.colors.textOnError[1];
lightTheme.colors.textOnError.superLight = lightTheme.colors.textOnError[2];

lightTheme.colors.textOnBackground.highEmphasis =
  lightTheme.colors.textOnBackground[0];
lightTheme.colors.textOnBackground.mediumEmphasis =
  lightTheme.colors.textOnBackground[1];
lightTheme.colors.textOnBackground.disabled =
  lightTheme.colors.textOnBackground[2];
lightTheme.colors.textOnThemeBackground.highEmphasis =
  lightTheme.colors.textOnThemeBackground[0];
lightTheme.colors.textOnThemeBackground.mediumEmphasis =
  lightTheme.colors.textOnThemeBackground[1];

// background
lightTheme.colors.background1 = lightTheme.colors.background[0];
lightTheme.colors.background2 = lightTheme.colors.background[1];
lightTheme.colors.background3 = lightTheme.colors.background[2];
lightTheme.colors.elevatedBackground1 = lightTheme.colors.elevatedBackground[0];
lightTheme.colors.elevatedBackground2 = lightTheme.colors.elevatedBackground[1];
lightTheme.colors.elevatedBackground3 = lightTheme.colors.elevatedBackground[2];
lightTheme.colors.elevatedBackground4 = lightTheme.colors.elevatedBackground[3];
lightTheme.colors.elevatedThemeBackground.mrp =
  lightTheme.colors.elevatedThemeBackground[0];
lightTheme.colors.elevatedThemeBackground.mdt =
  lightTheme.colors.elevatedThemeBackground[1];

// membership
lightTheme.colors.membership.newbie.background =
  lightTheme.colors.membership.newbie[0];
lightTheme.colors.membership.newbie.text =
  lightTheme.colors.membership.newbie[1];
lightTheme.colors.membership.newbie.border =
  lightTheme.colors.membership.newbie[2];
lightTheme.colors.membership.newbie.gradient =
  lightTheme.colors.membership.newbie[3];
lightTheme.colors.membership.starter.background =
  lightTheme.colors.membership.starter[0];
lightTheme.colors.membership.starter.text =
  lightTheme.colors.membership.starter[1];
lightTheme.colors.membership.starter.gradient =
  lightTheme.colors.membership.starter[3];
lightTheme.colors.membership.extra.background =
  lightTheme.colors.membership.extra[0];
lightTheme.colors.membership.extra.text = lightTheme.colors.membership.extra[1];
lightTheme.colors.membership.extra.gradient =
  lightTheme.colors.membership.extra[3];
lightTheme.colors.membership.elite.background =
  lightTheme.colors.membership.elite[0];
lightTheme.colors.membership.elite.text = lightTheme.colors.membership.elite[1];
lightTheme.colors.membership.elite.gradient =
  lightTheme.colors.membership.elite[3];
lightTheme.colors.membership.infinite.background =
  lightTheme.colors.membership.infinite[0];
lightTheme.colors.membership.infinite.text =
  lightTheme.colors.membership.infinite[1];
lightTheme.colors.membership.infinite.gradient =
  lightTheme.colors.membership.infinite[3];
lightTheme.colors.membership.infinite_privilege.background =
  lightTheme.colors.membership.infinite_privilege[0];
lightTheme.colors.membership.infinite_privilege.text =
  lightTheme.colors.membership.infinite_privilege[1];
lightTheme.colors.membership.infinite_privilege.gradient =
  lightTheme.colors.membership.infinite_privilege[3];

// others
lightTheme.colors.toggleOn.button = lightTheme.colors.toggleOn[0];
lightTheme.colors.toggleOn.track = lightTheme.colors.toggleOn[1];
lightTheme.colors.toggleOff.button = lightTheme.colors.toggleOff[0];
lightTheme.colors.toggleOff.track = lightTheme.colors.toggleOff[1];

lightTheme.colors.unknownCard.background = lightTheme.colors.unknownCard[0];
lightTheme.colors.unknownCard.color = lightTheme.colors.unknownCard[1];
lightTheme.colors.unknownCard.border = lightTheme.colors.unknownCard[2];

lightTheme.fonts.pageTitle = lightTheme.fonts.heading;
lightTheme.fonts.heading1 = lightTheme.fonts.heading;
lightTheme.fonts.heading2 = lightTheme.fonts.heading;
lightTheme.fonts.heading3 = lightTheme.fonts.heading;
lightTheme.fonts.heading4 = lightTheme.fonts.heading;
lightTheme.fonts.heading5 = lightTheme.fonts.heading;
lightTheme.fonts.heading6 = lightTheme.fonts.heading;
lightTheme.fonts.subTitle1 = lightTheme.fonts.heading;
lightTheme.fonts.subTitle2 = lightTheme.fonts.heading;
lightTheme.fonts.subTitle3 = lightTheme.fonts.heading;
lightTheme.fonts.body1 = lightTheme.fonts.body;
lightTheme.fonts.body2 = lightTheme.fonts.body;
lightTheme.fonts.caption = lightTheme.fonts.body;
lightTheme.fonts.captionNew = lightTheme.fonts.body;
lightTheme.fonts.value = lightTheme.fonts.body;
lightTheme.fonts.button = lightTheme.fonts.body;
lightTheme.fonts.label = lightTheme.fonts.heading;
lightTheme.fonts.overline = lightTheme.fonts.body;
lightTheme.fonts.initials1 = lightTheme.fonts.body;
lightTheme.fonts.initials2 = lightTheme.fonts.body;
lightTheme.fonts.initials3 = lightTheme.fonts.body;
lightTheme.fonts.unit11 = lightTheme.fonts.body;
lightTheme.fonts.unit16 = lightTheme.fonts.body;
lightTheme.fonts.digit12mono = lightTheme.fonts.body;
lightTheme.fonts.digit16mono = lightTheme.fonts.body;
lightTheme.fonts.digit36 = lightTheme.fonts.body;
lightTheme.fonts.digit36mono = lightTheme.fonts.body;

lightTheme.fontSizes.pageTitle = lightTheme.fontSizes[8];
lightTheme.fontSizes.heading1 = lightTheme.fontSizes[8];
lightTheme.fontSizes.heading2 = lightTheme.fontSizes[7];
lightTheme.fontSizes.heading3 = lightTheme.fontSizes[6];
lightTheme.fontSizes.heading4 = lightTheme.fontSizes[5];
lightTheme.fontSizes.heading5 = lightTheme.fontSizes[4];
lightTheme.fontSizes.heading6 = lightTheme.fontSizes[3];
lightTheme.fontSizes.subTitle1 = lightTheme.fontSizes[4];
lightTheme.fontSizes.subTitle2 = lightTheme.fontSizes[3];
lightTheme.fontSizes.subTitle3 = lightTheme.fontSizes[2];
lightTheme.fontSizes.body1 = lightTheme.fontSizes[3];
lightTheme.fontSizes.body2 = lightTheme.fontSizes[2];
lightTheme.fontSizes.caption = lightTheme.fontSizes[1];
lightTheme.fontSizes.captionNew = lightTheme.fontSizes[1];
lightTheme.fontSizes.value = lightTheme.fontSizes[3];
lightTheme.fontSizes.button = lightTheme.fontSizes[2];
lightTheme.fontSizes.label = lightTheme.fontSizes[1];
lightTheme.fontSizes.overline = lightTheme.fontSizes[0];
lightTheme.fontSizes.initials1 = lightTheme.fontSizes[6];
lightTheme.fontSizes.initials2 = lightTheme.fontSizes[8];
lightTheme.fontSizes.initials3 = lightTheme.fontSizes[9];
lightTheme.fontSizes.unit11 = lightTheme.fontSizes[10];
lightTheme.fontSizes.unit16 = lightTheme.fontSizes[3];
lightTheme.fontSizes.digit12mono = lightTheme.fontSizes[1];
lightTheme.fontSizes.digit16mono = lightTheme.fontSizes[3];
lightTheme.fontSizes.digit36 = lightTheme.fontSizes[8];
lightTheme.fontSizes.digit36mono = lightTheme.fontSizes[8];

lightTheme.fontWeights.pageTitle = lightTheme.fontWeights[1];
lightTheme.fontWeights.heading1 = lightTheme.fontWeights[1];
lightTheme.fontWeights.heading2 = lightTheme.fontWeights[1];
lightTheme.fontWeights.heading3 = lightTheme.fontWeights[1];
lightTheme.fontWeights.heading4 = lightTheme.fontWeights[1];
lightTheme.fontWeights.heading5 = lightTheme.fontWeights[1];
lightTheme.fontWeights.heading6 = lightTheme.fontWeights[1];
lightTheme.fontWeights.subTitle1 = lightTheme.fontWeights[2];
lightTheme.fontWeights.subTitle2 = lightTheme.fontWeights[2];
lightTheme.fontWeights.subTitle3 = lightTheme.fontWeights[2];
lightTheme.fontWeights.body1 = lightTheme.fontWeights[0];
lightTheme.fontWeights.body2 = lightTheme.fontWeights[0];
lightTheme.fontWeights.caption = lightTheme.fontWeights[0];
lightTheme.fontWeights.captionNew = lightTheme.fontWeights[0];
lightTheme.fontWeights.value = lightTheme.fontWeights[2];
lightTheme.fontWeights.button = lightTheme.fontWeights[2];
lightTheme.fontWeights.label = lightTheme.fontWeights[3];
lightTheme.fontWeights.overline = lightTheme.fontWeights[2];
lightTheme.fontWeights.initials1 = lightTheme.fontWeights[2];
lightTheme.fontWeights.initials2 = lightTheme.fontWeights[2];
lightTheme.fontWeights.initials3 = lightTheme.fontWeights[2];
lightTheme.fontWeights.unit11 = lightTheme.fontWeights[2];
lightTheme.fontWeights.unit16 = lightTheme.fontWeights[2];
lightTheme.fontWeights.digit12mono = lightTheme.fontWeights[1];
lightTheme.fontWeights.digit16mono = lightTheme.fontWeights[1];
lightTheme.fontWeights.digit36 = lightTheme.fontWeights[2];
lightTheme.fontWeights.digit36mono = lightTheme.fontWeights[2];

lightTheme.lineHeights.pageTitle = lightTheme.fontSizes.pageTitle * 1.25;
lightTheme.lineHeights.heading1 = lightTheme.fontSizes.heading1 * 1.25;
lightTheme.lineHeights.heading2 = lightTheme.fontSizes.heading2 * 1.25;
lightTheme.lineHeights.heading3 = lightTheme.fontSizes.heading3 * 1.25;
lightTheme.lineHeights.heading4 = lightTheme.fontSizes.heading4 * 1.25;
lightTheme.lineHeights.heading5 = lightTheme.fontSizes.heading5 * 1.25;
lightTheme.lineHeights.heading6 = lightTheme.fontSizes.heading6 * 1.25;
lightTheme.lineHeights.subTitle1 = lightTheme.fontSizes.subTitle1 * 1.25;
lightTheme.lineHeights.subTitle2 = lightTheme.fontSizes.subTitle2 * 1.25;
lightTheme.lineHeights.subTitle3 = lightTheme.fontSizes.subTitle3 * 1.25;
lightTheme.lineHeights.body1 = lightTheme.fontSizes.body1 * 1.5;
lightTheme.lineHeights.body2 = lightTheme.fontSizes.body2 * 1.5;
lightTheme.lineHeights.caption = lightTheme.fontSizes.caption * 1.5;
lightTheme.lineHeights.captionNew = lightTheme.fontSizes.captionNew * 1.25;
lightTheme.lineHeights.value = lightTheme.fontSizes.value * 1.5;
lightTheme.lineHeights.button = lightTheme.fontSizes.button * 1.5;
lightTheme.lineHeights.label = lightTheme.fontSizes.label * 1.5;
lightTheme.lineHeights.overline = lightTheme.fontSizes.overline * 1.5;
lightTheme.lineHeights.initials1 = lightTheme.fontSizes.initials1 * 1.5;
lightTheme.lineHeights.initials2 = lightTheme.fontSizes.initials2 * 1.5;
lightTheme.lineHeights.initials3 = lightTheme.fontSizes.initials3 * 1.5;
lightTheme.lineHeights.unit11 = lightTheme.fontSizes.unit11 * 1.5;
lightTheme.lineHeights.unit16 = lightTheme.fontSizes.unit16 * 1.5;
lightTheme.lineHeights.digit12mono = lightTheme.fontSizes.digit12mono * 1.25;
lightTheme.lineHeights.digit16mono = lightTheme.fontSizes.digit16mono * 1.5;
lightTheme.lineHeights.digit36 = lightTheme.fontSizes.digit36 * 1.5;
lightTheme.lineHeights.digit36mono = lightTheme.fontSizes.digit36mono * 1.5;

// main theme
darkTheme.colors.primary.normal = darkTheme.colors.primary[0];
darkTheme.colors.primary.dark = darkTheme.colors.primary[1];
darkTheme.colors.primary.border = darkTheme.colors.primary[2];

darkTheme.colors.secondary.normal = darkTheme.colors.secondary[0];
darkTheme.colors.secondary.light = darkTheme.colors.secondary[1];
darkTheme.colors.secondary.dark = darkTheme.colors.secondary[2];
darkTheme.colors.secondary.border = darkTheme.colors.secondary[3];
darkTheme.colors.secondary.superLight = darkTheme.colors.secondary[4];

// text
darkTheme.colors.textOnError.normal = darkTheme.colors.textOnError[0];
darkTheme.colors.textOnError.light = darkTheme.colors.textOnError[1];
darkTheme.colors.textOnError.superLight = darkTheme.colors.textOnError[2];

darkTheme.colors.textOnBackground.highEmphasis =
  darkTheme.colors.textOnBackground[0];
darkTheme.colors.textOnBackground.mediumEmphasis =
  darkTheme.colors.textOnBackground[1];
darkTheme.colors.textOnBackground.disabled =
  darkTheme.colors.textOnBackground[2];
darkTheme.colors.textOnThemeBackground.highEmphasis =
  darkTheme.colors.textOnThemeBackground[0];
darkTheme.colors.textOnThemeBackground.mediumEmphasis =
  darkTheme.colors.textOnThemeBackground[1];

// background
darkTheme.colors.background1 = darkTheme.colors.background[0];
darkTheme.colors.background2 = darkTheme.colors.background[1];
darkTheme.colors.background3 = darkTheme.colors.background[2];
darkTheme.colors.elevatedBackground1 = darkTheme.colors.elevatedBackground[0];
darkTheme.colors.elevatedBackground2 = darkTheme.colors.elevatedBackground[1];
darkTheme.colors.elevatedBackground3 = darkTheme.colors.elevatedBackground[2];
darkTheme.colors.elevatedBackground4 = darkTheme.colors.elevatedBackground[3];
darkTheme.colors.elevatedThemeBackground.mrp =
  darkTheme.colors.elevatedThemeBackground[0];
darkTheme.colors.elevatedThemeBackground.mdt =
  darkTheme.colors.elevatedThemeBackground[1];

// membership
darkTheme.colors.membership.newbie.background =
  darkTheme.colors.membership.newbie[0];
darkTheme.colors.membership.newbie.text = darkTheme.colors.membership.newbie[1];
darkTheme.colors.membership.newbie.border =
  darkTheme.colors.membership.newbie[2];
darkTheme.colors.membership.newbie.gradient =
  darkTheme.colors.membership.newbie[3];
darkTheme.colors.membership.starter.background =
  darkTheme.colors.membership.starter[0];
darkTheme.colors.membership.starter.text =
  darkTheme.colors.membership.starter[1];
darkTheme.colors.membership.starter.gradient =
  darkTheme.colors.membership.starter[3];
darkTheme.colors.membership.extra.background =
  darkTheme.colors.membership.extra[0];
darkTheme.colors.membership.extra.text = darkTheme.colors.membership.extra[1];
darkTheme.colors.membership.extra.gradient =
  darkTheme.colors.membership.extra[3];
darkTheme.colors.membership.elite.background =
  darkTheme.colors.membership.elite[0];
darkTheme.colors.membership.elite.text = darkTheme.colors.membership.elite[1];
darkTheme.colors.membership.elite.gradient =
  darkTheme.colors.membership.elite[3];
darkTheme.colors.membership.infinite.background =
  darkTheme.colors.membership.infinite[0];
darkTheme.colors.membership.infinite.text =
  darkTheme.colors.membership.infinite[1];
darkTheme.colors.membership.infinite.gradient =
  darkTheme.colors.membership.infinite[3];
darkTheme.colors.membership.infinite_privilege.background =
  darkTheme.colors.membership.infinite_privilege[0];
darkTheme.colors.membership.infinite_privilege.text =
  darkTheme.colors.membership.infinite_privilege[1];
darkTheme.colors.membership.infinite_privilege.border =
  darkTheme.colors.membership.infinite_privilege[2];
darkTheme.colors.membership.infinite_privilege.gradient =
  darkTheme.colors.membership.infinite_privilege[3];

// others
darkTheme.colors.toggleOn.button = darkTheme.colors.toggleOn[0];
darkTheme.colors.toggleOn.track = darkTheme.colors.toggleOn[1];
darkTheme.colors.toggleOff.button = darkTheme.colors.toggleOff[0];
darkTheme.colors.toggleOff.track = darkTheme.colors.toggleOff[1];

darkTheme.colors.unknownCard.background = darkTheme.colors.unknownCard[0];
darkTheme.colors.unknownCard.color = darkTheme.colors.unknownCard[1];
darkTheme.colors.unknownCard.border = darkTheme.colors.unknownCard[2];

darkTheme.fonts.pageTitle = darkTheme.fonts.heading;
darkTheme.fonts.heading1 = darkTheme.fonts.heading;
darkTheme.fonts.heading2 = darkTheme.fonts.heading;
darkTheme.fonts.heading3 = darkTheme.fonts.heading;
darkTheme.fonts.heading4 = darkTheme.fonts.heading;
darkTheme.fonts.heading5 = darkTheme.fonts.heading;
darkTheme.fonts.heading6 = darkTheme.fonts.heading;
darkTheme.fonts.subTitle1 = darkTheme.fonts.heading;
darkTheme.fonts.subTitle2 = darkTheme.fonts.heading;
darkTheme.fonts.subTitle3 = darkTheme.fonts.heading;
darkTheme.fonts.body1 = darkTheme.fonts.body;
darkTheme.fonts.body2 = darkTheme.fonts.body;
darkTheme.fonts.caption = darkTheme.fonts.body;
darkTheme.fonts.captionNew = darkTheme.fonts.body;
darkTheme.fonts.value = darkTheme.fonts.body;
darkTheme.fonts.button = darkTheme.fonts.body;
darkTheme.fonts.label = darkTheme.fonts.body;
darkTheme.fonts.overline = darkTheme.fonts.body;
darkTheme.fonts.initials1 = darkTheme.fonts.body;
darkTheme.fonts.initials2 = darkTheme.fonts.body;
darkTheme.fonts.initials3 = darkTheme.fonts.body;
darkTheme.fonts.unit11 = darkTheme.fonts.body;
darkTheme.fonts.unit16 = darkTheme.fonts.body;
darkTheme.fonts.digit12mono = darkTheme.fonts.body;
darkTheme.fonts.digit16mono = darkTheme.fonts.body;
darkTheme.fonts.digit36 = darkTheme.fonts.body;
darkTheme.fonts.digit36mono = darkTheme.fonts.body;

darkTheme.fontSizes.pageTitle = darkTheme.fontSizes[8];
darkTheme.fontSizes.heading1 = darkTheme.fontSizes[8];
darkTheme.fontSizes.heading2 = darkTheme.fontSizes[7];
darkTheme.fontSizes.heading3 = darkTheme.fontSizes[6];
darkTheme.fontSizes.heading4 = darkTheme.fontSizes[5];
darkTheme.fontSizes.heading5 = darkTheme.fontSizes[4];
darkTheme.fontSizes.heading6 = darkTheme.fontSizes[3];
darkTheme.fontSizes.subTitle1 = darkTheme.fontSizes[4];
darkTheme.fontSizes.subTitle2 = darkTheme.fontSizes[3];
darkTheme.fontSizes.subTitle3 = darkTheme.fontSizes[2];
darkTheme.fontSizes.body1 = darkTheme.fontSizes[3];
darkTheme.fontSizes.body2 = darkTheme.fontSizes[2];
darkTheme.fontSizes.caption = darkTheme.fontSizes[1];
darkTheme.fontSizes.captionNew = darkTheme.fontSizes[1];
darkTheme.fontSizes.value = darkTheme.fontSizes[3];
darkTheme.fontSizes.button = darkTheme.fontSizes[2];
darkTheme.fontSizes.label = darkTheme.fontSizes[1];
darkTheme.fontSizes.overline = darkTheme.fontSizes[0];
darkTheme.fontSizes.initials1 = darkTheme.fontSizes[6];
darkTheme.fontSizes.initials2 = darkTheme.fontSizes[8];
darkTheme.fontSizes.initials3 = darkTheme.fontSizes[9];
darkTheme.fontSizes.unit11 = darkTheme.fontSizes[10];
darkTheme.fontSizes.unit16 = darkTheme.fontSizes[3];
darkTheme.fontSizes.digit12mono = darkTheme.fontSizes[1];
darkTheme.fontSizes.digit16mono = darkTheme.fontSizes[3];
darkTheme.fontSizes.digit36 = darkTheme.fontSizes[8];
darkTheme.fontSizes.digit36mono = darkTheme.fontSizes[8];

darkTheme.fontWeights.pageTitle = darkTheme.fontWeights[1];
darkTheme.fontWeights.heading1 = darkTheme.fontWeights[1];
darkTheme.fontWeights.heading2 = darkTheme.fontWeights[1];
darkTheme.fontWeights.heading3 = darkTheme.fontWeights[1];
darkTheme.fontWeights.heading4 = darkTheme.fontWeights[1];
darkTheme.fontWeights.heading5 = darkTheme.fontWeights[1];
darkTheme.fontWeights.heading6 = darkTheme.fontWeights[1];
darkTheme.fontWeights.subTitle1 = darkTheme.fontWeights[2];
darkTheme.fontWeights.subTitle2 = darkTheme.fontWeights[2];
darkTheme.fontWeights.subTitle3 = darkTheme.fontWeights[2];
darkTheme.fontWeights.body1 = darkTheme.fontWeights[0];
darkTheme.fontWeights.body2 = darkTheme.fontWeights[0];
darkTheme.fontWeights.caption = darkTheme.fontWeights[0];
darkTheme.fontWeights.captionNew = darkTheme.fontWeights[0];
darkTheme.fontWeights.value = darkTheme.fontWeights[2];
darkTheme.fontWeights.button = darkTheme.fontWeights[2];
darkTheme.fontWeights.label = darkTheme.fontWeights[3];
darkTheme.fontWeights.overline = darkTheme.fontWeights[2];
darkTheme.fontWeights.initials1 = darkTheme.fontWeights[2];
darkTheme.fontWeights.initials2 = darkTheme.fontWeights[2];
darkTheme.fontWeights.initials3 = darkTheme.fontWeights[2];
darkTheme.fontWeights.unit11 = darkTheme.fontWeights[2];
darkTheme.fontWeights.unit16 = darkTheme.fontWeights[2];
darkTheme.fontWeights.digit12mono = darkTheme.fontWeights[1];
darkTheme.fontWeights.digit16mono = darkTheme.fontWeights[1];
darkTheme.fontWeights.digit36 = darkTheme.fontWeights[2];
darkTheme.fontWeights.digit36mono = darkTheme.fontWeights[2];

darkTheme.lineHeights.pageTitle = darkTheme.fontSizes.pageTitle * 1.25;
darkTheme.lineHeights.heading1 = darkTheme.fontSizes.heading1 * 1.25;
darkTheme.lineHeights.heading2 = darkTheme.fontSizes.heading2 * 1.25;
darkTheme.lineHeights.heading3 = darkTheme.fontSizes.heading3 * 1.25;
darkTheme.lineHeights.heading4 = darkTheme.fontSizes.heading4 * 1.25;
darkTheme.lineHeights.heading5 = darkTheme.fontSizes.heading5 * 1.25;
darkTheme.lineHeights.heading6 = darkTheme.fontSizes.heading6 * 1.25;
darkTheme.lineHeights.subTitle1 = darkTheme.fontSizes.subTitle1 * 1.25;
darkTheme.lineHeights.subTitle2 = darkTheme.fontSizes.subTitle2 * 1.25;
darkTheme.lineHeights.subTitle3 = darkTheme.fontSizes.subTitle3 * 1.25;
darkTheme.lineHeights.body1 = darkTheme.fontSizes.body1 * 1.5;
darkTheme.lineHeights.body2 = darkTheme.fontSizes.body2 * 1.5;
darkTheme.lineHeights.caption = darkTheme.fontSizes.caption * 1.5;
darkTheme.lineHeights.captionNew = darkTheme.fontSizes.captionNew * 1.25;
darkTheme.lineHeights.value = darkTheme.fontSizes.value * 1.5;
darkTheme.lineHeights.button = darkTheme.fontSizes.button * 1.5;
darkTheme.lineHeights.label = darkTheme.fontSizes.label * 1.5;
darkTheme.lineHeights.overline = darkTheme.fontSizes.overline * 1.5;
darkTheme.lineHeights.initials1 = darkTheme.fontSizes.initials1 * 1.5;
darkTheme.lineHeights.initials2 = darkTheme.fontSizes.initials2 * 1.5;
darkTheme.lineHeights.initials3 = darkTheme.fontSizes.initials3 * 1.5;
darkTheme.lineHeights.unit11 = darkTheme.fontSizes.unit11 * 1.5;
darkTheme.lineHeights.unit16 = darkTheme.fontSizes.unit16 * 1.5;
darkTheme.lineHeights.digit12mono = darkTheme.fontSizes.digit12mono * 1.25;
darkTheme.lineHeights.digit16mono = darkTheme.fontSizes.digit16mono * 1.5;
darkTheme.lineHeights.digit36 = darkTheme.fontSizes.digit36 * 1.5;
darkTheme.lineHeights.digit36mono = darkTheme.fontSizes.digit36mono * 1.5;
