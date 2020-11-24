import {Platform} from 'react-native';
import {transparentize} from 'polished';

export const darkTheme = {
  colors: {
    // main theme
    primary: ['#9FBDE9', '#6B91DB', '#364562'],
    secondary: ['#88D9DE', '#2C5F63'],
    contrastColor: '#FFFFFF',

    // background
    background: ['#121212'],
    elevatedBackground: [
      'background-color: #121212;',
      'background-color: #232323;',
      'background-color: #2C2C2C;',
      'background-color: #363636;',
    ],
    elevatedDarkerBackground: [
      'background-color: #121212;',
      'background-color: #1E1E1E;',
      'background-color: #232323;',
      'background-color: #2C2C2C;',
    ],
    elevatedDarkerCardSurface: [
      'background-color: #1E1E1E; border-color: rgba(255, 255, 255, 0.08);',
      'background-color: #232323; border-color: rgba(255, 255, 255, 0.08);',
      'background-color: #2C2C2C; border-color: rgba(255, 255, 255, 0.08);',
      'background-color: #363636; border-color: rgba(255, 255, 255, 0.08);',
    ],
    elevatedThemeBackground: [
      'background-color: #232323;',
      'background-color: #232323;',
    ],
    inputFocusBackground: 'rgba(159, 189, 233, 0.2)',
    errorBackground: 'rgba(255, 113, 113, 0.2)',
    linesBackground: '#101320',
    detailBox: {},

    // text
    textOfMrp: '#88D9DE',
    textOfMdt: '#9FBDE9',
    textOnError: ['#FF7171'],
    textOnBackground: {},
    textOnThemeBackground: [
      'rgba(255, 255, 255, 0.87)',
      'rgba(255, 255, 255, 0.6)',
    ],

    // membership
    membership: {
      newbie: {
        badge: ['#000000'],
        card: ['#848484'],
        dashboard: [['#121212', '#121212']],
      },
      starter: {
        badge: [],
        card: ['#758283'],
        dashboard: [['#005A5F', '#003234']],
        star: ['#21CEDB'],
      },
      extra: {
        badge: [],
        card: ['#797E85'],
        dashboard: [['#003A8F', '#002862']],
        star: ['#0363EF'],
      },
      elite: {
        badge: ['#DBDBDB', '#454545'],
        card: ['#828282'],
        dashboard: [['#656565', '#363636']],
        star: ['#C4C4C4'],
      },
      infinite: {
        badge: ['#ECDCBC', '#6F5D40'],
        card: ['#848079'],
        dashboard: [['#745A00', '#292300']],
        star: ['#DEC8A2'],
      },
      infinite_privilege: {
        badge: ['#000000'],
        card: ['#656565'],
        dashboard: [['#575757', '#313131']],
        star: ['#646464'],
      },
    },

    toggleOn: {},
    toggleOff: {},

    // logo
    logo: {
      plaid: 'rgba(255, 255, 255, 0.87)',
    },

    unknownCard: ['#252525', '#777777', '#363636'],

    // tag
    tag: {
      primary: {
        background: {},
        text: {},
      },
      secondary: {
        background: {},
        text: {},
      },
      contrast: {
        background: {},
        text: {},
      },
      onBackground: {
        background: {},
        text: {},
      },
    },

    // others
    borderColor: 'rgba(255, 255, 255, 0.2)',
    contrastBorderColor: 'rgba(18, 18, 18, 0.2)',

    linearGradientBackground: [
      ['#121212', '#121212'],
      ['rgba(30, 30, 30, 0)', '#1E1E1E'],
      ['#3B4F50', '#232323'],
      ['#656565', '#363636'],
      ['#695A26', '#353329'],
      ['#000000', '#383838'],
    ],
    tabScreenStatusBar: '#121212',

    system_theme: '#121212',

    alert: '#FFD542',

    rewardCircleBackground: '#464646',

    cashBackSummaryBackground: '#232323',
    cashBackSummaryChip: '#4B4B4B',

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
    primary: ['#0363EF', '#0036C5'],
    secondary: ['#21CEDB', '#ABEBEE', '#00BACE'],
    contrastColor: '#000000',

    // background
    background: ['#FFFFFF', '#F2F2F2'],
    elevatedBackground: [
      'background-color: #FFFFFF;',
      'background-color: #FFFFFF; box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);',
      'background-color: #FFFFFF; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);',
      'background-color: #FFFFFF; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);',
    ],
    elevatedDarkerBackground: [
      'background-color: #F2F2F2;',
      'background-color: #F2F2F2; box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);',
      'background-color: #F2F2F2; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);',
      'background-color: #F2F2F2; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);',
    ],
    elevatedDarkerCardSurface: [
      'background-color: #FFFFFF;',
      'background-color: #FFFFFF;',
      'background-color: #FFFFFF;',
      'background-color: #FFFFFF;',
    ],
    elevatedThemeBackground: [
      'background-color: #FFFFFF; box-shadow: 0px 4px 8px rgba(11, 142, 157, 0.1);',
      'background-color: #FFFFFF; box-shadow: 0px 4px 8px rgba(3, 99, 239, 0.1);',
    ],
    inputFocusBackground: 'rgba(3, 99, 239, 0.05)',
    errorBackground: 'rgba(216, 16, 16, 0.1)',
    linesBackground: '#001C83',
    detailBox: {},

    // text
    textOfMrp: '#1E7884',
    textOfMdt: '#0036C5',
    textOnError: ['#D81010'],
    textOnBackground: {},
    textOnThemeBackground: {},

    // membership
    membership: {
      newbie: {
        badge: {},
        card: ['#FAFAFA'],
        dashboard: [['#FAFAFA', '#F2F2F2']],
      },
      starter: {
        badge: [],
        card: ['#D4F5F6'],
        dashboard: [['#ABEBEE', '#E6FEFF']],
        star: ['#21CEDB'],
      },
      extra: {
        badge: [],
        card: ['#DDEAFC'],
        dashboard: [['#C9DFFF', '#EAF2FF']],
        star: ['#0363EF'],
      },
      elite: {
        badge: ['#DBDBDB', '#454545'],
        card: ['#F4F4F4'],
        dashboard: [['#DEDEDE', '#F7F7F7']],
        star: ['#C4C4C4'],
      },
      infinite: {
        badge: ['#FFDC22', '#8F722E'],
        card: ['#F9EEDD'],
        dashboard: [['#EEDBBA', '#FFF8EC']],
        star: ['#DEC8A2'],
      },
      infinite_privilege: {
        badge: {},
        card: ['#ACACAC'],
        dashboard: [['#A3A3A3', '#F2F2F2']],
        star: ['#646464'],
      },
    },

    toggleOn: {},
    toggleOff: {},

    // logo
    logo: {
      plaid: '#111111',
    },

    unknownCard: ['#F2F2F2', '#919191', '#E6E6E6'],

    // tag
    tag: {
      primary: {
        background: {},
        text: {},
      },
      secondary: {
        background: {},
        text: {},
      },
      contrast: {
        background: {},
        text: {},
      },
      onBackground: {
        background: {},
        text: {},
      },
    },

    // others
    linearGradientBackground: [
      ['#FDFBF2', '#E2FAFF'],
      ['rgba(255, 255, 255, 0)', '#FFFFFF'],
      ['#B0F8FD', '#232323'],
      ['#DEDEDE', '#F6F6F6'],
      ['#EEDBBA', '#FFF8EC'],
      ['#A3A3A3', '#F2F2F2'],
    ],
    tabScreenStatusBar: '#FDFBF2',

    system_theme: '#F4F4F4',

    rewardCircleBackground: {},
    cashBackSummaryChip: {},
    cashBackSummaryBackground: '#E9FAFB',

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
    smallText: 'Inter-Medium',
  },
  fontSizes: [10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 11],
  fontWeights: [400, 500, 600, 700],
  lineHeights: {},
};

// main theme
lightTheme.colors.primary.normal = lightTheme.colors.primary[0];
lightTheme.colors.primary.dark = lightTheme.colors.primary[1];
lightTheme.colors.primary.normal20Opacity = transparentize(
  0.8,
  lightTheme.colors.primary.normal,
);
lightTheme.colors.primary.walletBackground = lightTheme.colors.primary.normal;

lightTheme.colors.secondary.normal = lightTheme.colors.secondary[0];
lightTheme.colors.secondary.light = lightTheme.colors.secondary[1];
lightTheme.colors.secondary.dark = lightTheme.colors.secondary[2];
lightTheme.colors.secondary.normal20Opacity = transparentize(
  0.8,
  lightTheme.colors.secondary.normal,
);
lightTheme.colors.secondary.normal10Opacity = transparentize(
  0.9,
  lightTheme.colors.secondary.normal,
);
lightTheme.colors.secondary.walletBackground =
  lightTheme.colors.secondary.normal;

// background
lightTheme.colors.background1 = lightTheme.colors.background[0];
lightTheme.colors.background2 = transparentize(
  0.95,
  lightTheme.colors.contrastColor,
);
lightTheme.colors.background3 = transparentize(
  0.9,
  lightTheme.colors.contrastColor,
);
lightTheme.colors.background4 = lightTheme.colors.background[1];

lightTheme.colors.elevatedBackgroundFlat =
  lightTheme.colors.elevatedBackground[0];
lightTheme.colors.elevatedBackgroundLow =
  lightTheme.colors.elevatedBackground[1];
lightTheme.colors.elevatedBackgroundMedium =
  lightTheme.colors.elevatedBackground[2];
lightTheme.colors.elevatedBackgroundHigh =
  lightTheme.colors.elevatedBackground[3];

lightTheme.colors.elevatedDarkerBackgroundFlat =
  lightTheme.colors.elevatedDarkerBackground[0];
lightTheme.colors.elevatedDarkerBackgroundLow =
  lightTheme.colors.elevatedDarkerBackground[1];
lightTheme.colors.elevatedDarkerBackgroundMedium =
  lightTheme.colors.elevatedDarkerBackground[2];
lightTheme.colors.elevatedDarkerBackgroundHigh =
  lightTheme.colors.elevatedDarkerBackground[3];

lightTheme.colors.elevatedDarkerCardFlat =
  lightTheme.colors.elevatedDarkerCardSurface[0];
lightTheme.colors.elevatedDarkerCardLow =
  lightTheme.colors.elevatedDarkerCardSurface[1];
lightTheme.colors.elevatedDarkerCardMedium =
  lightTheme.colors.elevatedDarkerCardSurface[2];
lightTheme.colors.elevatedDarkerCardHigh =
  lightTheme.colors.elevatedDarkerCardSurface[3];

lightTheme.colors.elevatedThemeBackground.mrp =
  lightTheme.colors.elevatedThemeBackground[0];
lightTheme.colors.elevatedThemeBackground.mdt =
  lightTheme.colors.elevatedThemeBackground[1];

lightTheme.colors.themeBackground = lightTheme.colors.secondary.normal;

lightTheme.colors.linearGradientBackground.theme =
  lightTheme.colors.linearGradientBackground[0];
lightTheme.colors.linearGradientBackground.contrast =
  lightTheme.colors.linearGradientBackground[1];
lightTheme.colors.linearGradientBackground.cashBackSummary =
  lightTheme.colors.linearGradientBackground[2];
lightTheme.colors.linearGradientBackground.elite =
  lightTheme.colors.linearGradientBackground[3];
lightTheme.colors.linearGradientBackground.infinite =
  lightTheme.colors.linearGradientBackground[4];
lightTheme.colors.linearGradientBackground.infinite_privilege =
  lightTheme.colors.linearGradientBackground[5];

// text
lightTheme.colors.textOnError.normal = lightTheme.colors.textOnError[0];
lightTheme.colors.textOnError.light = transparentize(
  0.4,
  lightTheme.colors.textOnError.normal,
);
lightTheme.colors.textOnError.superLight = transparentize(
  0.9,
  lightTheme.colors.textOnError.normal,
);

lightTheme.colors.textOnBackground.highEmphasis = transparentize(
  0.2,
  lightTheme.colors.contrastColor,
);
lightTheme.colors.textOnBackground.mediumEmphasis = transparentize(
  0.4,
  lightTheme.colors.contrastColor,
);
lightTheme.colors.textOnBackground.disabled = transparentize(
  0.6,
  lightTheme.colors.contrastColor,
);
lightTheme.colors.textOnThemeBackground.highEmphasis =
  lightTheme.colors.background1;
lightTheme.colors.textOnThemeBackground.mediumEmphasis =
  lightTheme.colors.background1;

// DetailBox
lightTheme.colors.detailBox.primary = transparentize(
  0.9,
  lightTheme.colors.primary.normal,
);
lightTheme.colors.detailBox.secondary = transparentize(
  0.9,
  lightTheme.colors.secondary.normal,
);
lightTheme.colors.detailBox.error = transparentize(
  0.9,
  lightTheme.colors.textOnError.normal,
);

// membership
lightTheme.colors.membership.newbie.badge.background =
  lightTheme.colors.contrastColor;
lightTheme.colors.membership.newbie.badge.text = lightTheme.colors.background1;
lightTheme.colors.membership.newbie.dashboard.gradient =
  lightTheme.colors.membership.newbie.dashboard[0];
lightTheme.colors.membership.newbie.card.background =
  lightTheme.colors.membership.newbie.card[0];
lightTheme.colors.membership.newbie.card.text = lightTheme.colors.contrastColor;

lightTheme.colors.membership.starter.badge.background =
  lightTheme.colors.secondary.normal;
lightTheme.colors.membership.starter.badge.text = lightTheme.colors.background1;
lightTheme.colors.membership.starter.dashboard.gradient =
  lightTheme.colors.membership.starter.dashboard[0];
lightTheme.colors.membership.starter.card.background =
  lightTheme.colors.membership.starter.card[0];
lightTheme.colors.membership.starter.card.text =
  lightTheme.colors.contrastColor;
lightTheme.colors.membership.starter.star =
  lightTheme.colors.membership.starter.star[0];

lightTheme.colors.membership.extra.badge.background =
  lightTheme.colors.primary.normal;
lightTheme.colors.membership.extra.badge.text = lightTheme.colors.background1;
lightTheme.colors.membership.extra.dashboard.gradient =
  lightTheme.colors.membership.extra.dashboard[0];
lightTheme.colors.membership.extra.card.background =
  lightTheme.colors.membership.extra.card[0];
lightTheme.colors.membership.extra.card.text = lightTheme.colors.contrastColor;
lightTheme.colors.membership.extra.star =
  lightTheme.colors.membership.extra.star[0];

lightTheme.colors.membership.elite.badge.background =
  lightTheme.colors.membership.elite.badge[0];
lightTheme.colors.membership.elite.badge.text =
  lightTheme.colors.membership.elite.badge[1];
lightTheme.colors.membership.elite.dashboard.gradient =
  lightTheme.colors.membership.elite.dashboard[0];
lightTheme.colors.membership.elite.card.background =
  lightTheme.colors.membership.elite.card[0];
lightTheme.colors.membership.elite.card.text = lightTheme.colors.contrastColor;
lightTheme.colors.membership.elite.star =
  lightTheme.colors.membership.elite.star[0];

lightTheme.colors.membership.infinite.badge.background =
  lightTheme.colors.membership.infinite.badge[0];
lightTheme.colors.membership.infinite.badge.text =
  lightTheme.colors.membership.infinite.badge[1];
lightTheme.colors.membership.infinite.dashboard.gradient =
  lightTheme.colors.membership.infinite.dashboard[0];
lightTheme.colors.membership.infinite.card.background =
  lightTheme.colors.membership.infinite.card[0];
lightTheme.colors.membership.infinite.card.text =
  lightTheme.colors.contrastColor;
lightTheme.colors.membership.infinite.star =
  lightTheme.colors.membership.infinite.star[0];

lightTheme.colors.membership.infinite_privilege.badge.background =
  lightTheme.colors.contrastColor;
lightTheme.colors.membership.infinite_privilege.badge.text =
  lightTheme.colors.background1;
lightTheme.colors.membership.infinite_privilege.dashboard.gradient =
  lightTheme.colors.membership.infinite_privilege.dashboard[0];
lightTheme.colors.membership.infinite_privilege.card.background =
  lightTheme.colors.membership.infinite_privilege.card[0];
lightTheme.colors.membership.infinite_privilege.card.text =
  lightTheme.colors.background1;
lightTheme.colors.membership.infinite_privilege.star =
  lightTheme.colors.membership.infinite_privilege.star[0];

// tag
lightTheme.colors.tag.primary.background.transparent = transparentize(
  0.9,
  lightTheme.colors.primary.normal,
);
lightTheme.colors.tag.primary.background.normal =
  lightTheme.colors.primary.normal;
lightTheme.colors.tag.primary.text.transparent =
  lightTheme.colors.primary.normal;
lightTheme.colors.tag.primary.text.normal = lightTheme.colors.background1;

lightTheme.colors.tag.secondary.background.transparent = transparentize(
  0.9,
  lightTheme.colors.secondary.normal,
);
lightTheme.colors.tag.secondary.background.normal =
  lightTheme.colors.secondary.normal;
lightTheme.colors.tag.secondary.text.transparent =
  lightTheme.colors.secondary.normal;
lightTheme.colors.tag.secondary.text.normal = lightTheme.colors.background1;

lightTheme.colors.tag.contrast.background.transparent = transparentize(
  0.9,
  lightTheme.colors.contrastColor,
);
lightTheme.colors.tag.contrast.background.normal =
  lightTheme.colors.contrastColor;
lightTheme.colors.tag.contrast.text.transparent = transparentize(
  0.4,
  lightTheme.colors.contrastColor,
);
lightTheme.colors.tag.contrast.text.normal = transparentize(
  0.4,
  lightTheme.colors.background1,
);

lightTheme.colors.tag.onBackground.background.transparent = transparentize(
  0.4,
  lightTheme.colors.background1,
);
lightTheme.colors.tag.onBackground.background.normal =
  lightTheme.colors.background1;
lightTheme.colors.tag.onBackground.text.transparent = transparentize(
  0.4,
  lightTheme.colors.contrastColor,
);
lightTheme.colors.tag.onBackground.text.normal = transparentize(
  0.4,
  lightTheme.colors.contrastColor,
);

// border
lightTheme.colors.borderColor = transparentize(
  0.8,
  lightTheme.colors.contrastColor,
);
lightTheme.colors.contrastBorderColor = transparentize(
  0.8,
  lightTheme.colors.background1,
);

// button
lightTheme.colors.buttonContrastBorderColor = transparentize(
  0.6,
  lightTheme.colors.background1,
);
lightTheme.colors.buttonContrastTextColor = lightTheme.colors.background1;

// others
lightTheme.colors.toggleOn.button = lightTheme.colors.background1;
lightTheme.colors.toggleOn.track = lightTheme.colors.secondary.normal;
lightTheme.colors.toggleOff.button = transparentize(
  0.13,
  lightTheme.colors.background1,
);
lightTheme.colors.toggleOff.track = transparentize(
  0.9,
  lightTheme.colors.contrastColor,
);

lightTheme.colors.unknownCard.background = lightTheme.colors.unknownCard[0];
lightTheme.colors.unknownCard.color = lightTheme.colors.unknownCard[1];
lightTheme.colors.unknownCard.border = lightTheme.colors.unknownCard[2];

lightTheme.colors.rewardCircleBackground = lightTheme.colors.background1;
lightTheme.colors.cashBackSummaryChip = lightTheme.colors.background1;

lightTheme.fonts.pageTitle = lightTheme.fonts.heading;
lightTheme.fonts.heading1 = lightTheme.fonts.heading;
lightTheme.fonts.heading2 = lightTheme.fonts.heading;
lightTheme.fonts.heading3 = lightTheme.fonts.heading;
lightTheme.fonts.heading4 = lightTheme.fonts.heading;
lightTheme.fonts.heading5 = lightTheme.fonts.heading;
lightTheme.fonts.heading6 = lightTheme.fonts.heading;
lightTheme.fonts.subTitle1 = lightTheme.fonts.body;
lightTheme.fonts.subTitle2 = lightTheme.fonts.body;
lightTheme.fonts.subTitle3 = lightTheme.fonts.body;
lightTheme.fonts.body1 = lightTheme.fonts.body;
lightTheme.fonts.body2 = lightTheme.fonts.body;
lightTheme.fonts.caption = lightTheme.fonts.body;
lightTheme.fonts.captionNew = lightTheme.fonts.body;
lightTheme.fonts.value = lightTheme.fonts.body;
lightTheme.fonts.button = lightTheme.fonts.body;
lightTheme.fonts.moreCompactButton = lightTheme.fonts.body;
lightTheme.fonts.label = lightTheme.fonts.heading;
lightTheme.fonts.overline = lightTheme.fonts.body;
lightTheme.fonts.smallText = lightTheme.fonts.body;
lightTheme.fonts.initials1 = lightTheme.fonts.body;
lightTheme.fonts.initials2 = lightTheme.fonts.body;
lightTheme.fonts.initials3 = lightTheme.fonts.body;
lightTheme.fonts.unit11 = lightTheme.fonts.body;
lightTheme.fonts.unit16 = lightTheme.fonts.body;
lightTheme.fonts.digit12mono = lightTheme.fonts.body;
lightTheme.fonts.digit16mono = lightTheme.fonts.body;
lightTheme.fonts.digit36 = lightTheme.fonts.body;
lightTheme.fonts.digit36mono = lightTheme.fonts.body;
lightTheme.fonts.smallText = lightTheme.fonts.smallText;

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
lightTheme.fontSizes.moreCompactButton = lightTheme.fontSizes[0];
lightTheme.fontSizes.label = lightTheme.fontSizes[1];
lightTheme.fontSizes.overline = lightTheme.fontSizes[0];
lightTheme.fontSizes.smallText = lightTheme.fontSizes[1];
lightTheme.fontSizes.initials1 = lightTheme.fontSizes[6];
lightTheme.fontSizes.initials2 = lightTheme.fontSizes[8];
lightTheme.fontSizes.initials3 = lightTheme.fontSizes[9];
lightTheme.fontSizes.unit11 = lightTheme.fontSizes[10];
lightTheme.fontSizes.unit16 = lightTheme.fontSizes[3];
lightTheme.fontSizes.digit12mono = lightTheme.fontSizes[1];
lightTheme.fontSizes.digit16mono = lightTheme.fontSizes[3];
lightTheme.fontSizes.digit36 = lightTheme.fontSizes[8];
lightTheme.fontSizes.digit36mono = lightTheme.fontSizes[8];
lightTheme.fontSizes.smallText = lightTheme.fontSizes[1];

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
lightTheme.fontWeights.moreCompactButton = lightTheme.fontWeights[2];
lightTheme.fontWeights.label = lightTheme.fontWeights[3];
lightTheme.fontWeights.overline = lightTheme.fontWeights[2];
lightTheme.fontWeights.smallText = lightTheme.fontWeights[1];
lightTheme.fontWeights.initials1 = lightTheme.fontWeights[2];
lightTheme.fontWeights.initials2 = lightTheme.fontWeights[2];
lightTheme.fontWeights.initials3 = lightTheme.fontWeights[2];
lightTheme.fontWeights.unit11 = lightTheme.fontWeights[2];
lightTheme.fontWeights.unit16 = lightTheme.fontWeights[2];
lightTheme.fontWeights.digit12mono = lightTheme.fontWeights[1];
lightTheme.fontWeights.digit16mono = lightTheme.fontWeights[1];
lightTheme.fontWeights.digit36 = lightTheme.fontWeights[2];
lightTheme.fontWeights.digit36mono = lightTheme.fontWeights[2];
lightTheme.fontWeights.smallText = lightTheme.fontWeights[1];

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
lightTheme.lineHeights.moreCompactButton =
  lightTheme.fontSizes.moreCompactButton * 1.5;
lightTheme.lineHeights.label = lightTheme.fontSizes.label * 1.5;
lightTheme.lineHeights.overline = lightTheme.fontSizes.overline * 1.5;
lightTheme.lineHeights.smallText = lightTheme.fontSizes.smallText * 1.25;
lightTheme.lineHeights.initials1 = lightTheme.fontSizes.initials1 * 1.5;
lightTheme.lineHeights.initials2 = lightTheme.fontSizes.initials2 * 1.5;
lightTheme.lineHeights.initials3 = lightTheme.fontSizes.initials3 * 1.5;
lightTheme.lineHeights.unit11 = lightTheme.fontSizes.unit11 * 1.5;
lightTheme.lineHeights.unit16 = lightTheme.fontSizes.unit16 * 1.5;
lightTheme.lineHeights.digit12mono = lightTheme.fontSizes.digit12mono;
lightTheme.lineHeights.digit16mono = lightTheme.fontSizes.digit16mono;
lightTheme.lineHeights.digit36 = lightTheme.fontSizes.digit36;
lightTheme.lineHeights.digit36mono = lightTheme.fontSizes.digit36mono;
lightTheme.lineHeights.smallText = lightTheme.fontSizes.smallText * 1.25;

// main theme
darkTheme.colors.primary.normal = darkTheme.colors.primary[0];
darkTheme.colors.primary.dark = darkTheme.colors.primary.normal;
darkTheme.colors.primary.normal20Opacity = transparentize(
  0.8,
  darkTheme.colors.primary.normal,
);
darkTheme.colors.primary.walletBackground = darkTheme.colors.primary[2];

darkTheme.colors.secondary.normal = darkTheme.colors.secondary[0];
darkTheme.colors.secondary.light = darkTheme.colors.secondary.normal;
darkTheme.colors.secondary.dark = darkTheme.colors.secondary.normal;
darkTheme.colors.secondary.normal20Opacity = transparentize(
  0.8,
  darkTheme.colors.secondary.normal,
);
darkTheme.colors.secondary.normal10Opacity = transparentize(
  0.9,
  darkTheme.colors.secondary.normal,
);
darkTheme.colors.secondary.walletBackground = darkTheme.colors.secondary[1];

// background
darkTheme.colors.background1 = darkTheme.colors.background[0];
darkTheme.colors.background2 = transparentize(
  0.88,
  darkTheme.colors.contrastColor,
);
darkTheme.colors.background3 = darkTheme.colors.background2 = transparentize(
  0.8,
  darkTheme.colors.contrastColor,
);
darkTheme.colors.background4 = darkTheme.colors.background1;
darkTheme.colors.elevatedBackgroundFlat =
  darkTheme.colors.elevatedBackground[0];
darkTheme.colors.elevatedBackgroundLow = darkTheme.colors.elevatedBackground[1];
darkTheme.colors.elevatedBackgroundMedium =
  darkTheme.colors.elevatedBackground[2];
darkTheme.colors.elevatedBackgroundHigh =
  darkTheme.colors.elevatedBackground[3];

darkTheme.colors.elevatedDarkerBackgroundFlat =
  darkTheme.colors.elevatedDarkerBackground[0];
darkTheme.colors.elevatedDarkerBackgroundLow =
  darkTheme.colors.elevatedDarkerBackground[1];
darkTheme.colors.elevatedDarkerBackgroundMedium =
  darkTheme.colors.elevatedDarkerBackground[2];
darkTheme.colors.elevatedDarkerBackgroundHigh =
  darkTheme.colors.elevatedDarkerBackground[3];

darkTheme.colors.elevatedDarkerCardFlat =
  darkTheme.colors.elevatedDarkerCardSurface[0];
darkTheme.colors.elevatedDarkerCardLow =
  darkTheme.colors.elevatedDarkerCardSurface[1];
darkTheme.colors.elevatedDarkerCardMedium =
  darkTheme.colors.elevatedDarkerCardSurface[2];
darkTheme.colors.elevatedDarkerCardHigh =
  darkTheme.colors.elevatedDarkerCardSurface[3];

darkTheme.colors.elevatedThemeBackground.mrp =
  darkTheme.colors.elevatedThemeBackground[0];
darkTheme.colors.elevatedThemeBackground.mdt =
  darkTheme.colors.elevatedThemeBackground[1];

darkTheme.colors.themeBackground = darkTheme.colors.background1;

darkTheme.colors.linearGradientBackground.theme =
  darkTheme.colors.linearGradientBackground[0];
darkTheme.colors.linearGradientBackground.contrast =
  darkTheme.colors.linearGradientBackground[1];
darkTheme.colors.linearGradientBackground.cashBackSummary =
  darkTheme.colors.linearGradientBackground[2];
darkTheme.colors.linearGradientBackground.elite =
  darkTheme.colors.linearGradientBackground[3];
darkTheme.colors.linearGradientBackground.infinite =
  darkTheme.colors.linearGradientBackground[4];
darkTheme.colors.linearGradientBackground.infinite_privilege =
  darkTheme.colors.linearGradientBackground[5];

// text
darkTheme.colors.textOnError.normal = darkTheme.colors.textOnError[0];
darkTheme.colors.textOnError.light = transparentize(
  0.3,
  darkTheme.colors.textOnError.normal,
);
darkTheme.colors.textOnError.superLight = transparentize(
  0.84,
  darkTheme.colors.textOnError.normal,
);

darkTheme.colors.textOnBackground.highEmphasis = transparentize(
  0.13,
  darkTheme.colors.contrastColor,
);
darkTheme.colors.textOnBackground.mediumEmphasis = transparentize(
  0.4,
  darkTheme.colors.contrastColor,
);
darkTheme.colors.textOnBackground.disabled = transparentize(
  0.62,
  darkTheme.colors.contrastColor,
);
darkTheme.colors.textOnThemeBackground.highEmphasis = transparentize(
  0.13,
  darkTheme.colors.contrastColor,
);
darkTheme.colors.textOnThemeBackground.mediumEmphasis = transparentize(
  0.4,
  darkTheme.colors.contrastColor,
);

// DetailBox
darkTheme.colors.detailBox.primary = transparentize(
  0.8,
  darkTheme.colors.primary.normal,
);
darkTheme.colors.detailBox.secondary = transparentize(
  0.8,
  darkTheme.colors.secondary.normal,
);
darkTheme.colors.detailBox.error = transparentize(
  0.8,
  darkTheme.colors.textOnError.normal,
);

// membership
darkTheme.colors.membership.newbie.badge.background =
  darkTheme.colors.membership.newbie.badge[0];
darkTheme.colors.membership.newbie.badge.text = darkTheme.colors.contrastColor;
darkTheme.colors.membership.newbie.badge.border =
  darkTheme.colors.contrastColor;
darkTheme.colors.membership.newbie.dashboard.gradient =
  darkTheme.colors.membership.newbie.dashboard[0];
darkTheme.colors.membership.newbie.card.background =
  darkTheme.colors.membership.newbie.card[0];
darkTheme.colors.membership.newbie.card.text = transparentize(
  0.13,
  darkTheme.colors.contrastColor,
);

darkTheme.colors.membership.starter.badge.background =
  darkTheme.colors.secondary.normal;
darkTheme.colors.membership.starter.badge.text = darkTheme.colors.background1;
darkTheme.colors.membership.starter.dashboard.gradient =
  darkTheme.colors.membership.starter.dashboard[0];
darkTheme.colors.membership.starter.card.background =
  darkTheme.colors.membership.starter.card[0];
darkTheme.colors.membership.starter.card.text = transparentize(
  0.13,
  darkTheme.colors.contrastColor,
);
darkTheme.colors.membership.starter.star =
  darkTheme.colors.membership.starter.star[0];

darkTheme.colors.membership.extra.badge.background =
  darkTheme.colors.primary.normal;
darkTheme.colors.membership.extra.badge.text = darkTheme.colors.background1;
darkTheme.colors.membership.extra.dashboard.gradient =
  darkTheme.colors.membership.extra.dashboard[0];
darkTheme.colors.membership.extra.card.background =
  darkTheme.colors.membership.extra.card[0];
darkTheme.colors.membership.extra.card.text = darkTheme.colors.membership.starter.card.text = transparentize(
  0.13,
  darkTheme.colors.contrastColor,
);
darkTheme.colors.membership.extra.star =
  darkTheme.colors.membership.extra.star[0];

darkTheme.colors.membership.elite.badge.background =
  darkTheme.colors.membership.elite.badge[0];
darkTheme.colors.membership.elite.badge.text =
  darkTheme.colors.membership.elite.badge[1];
darkTheme.colors.membership.elite.dashboard.gradient =
  darkTheme.colors.membership.elite.dashboard[0];
darkTheme.colors.membership.elite.card.background =
  darkTheme.colors.membership.elite.card[0];
darkTheme.colors.membership.elite.card.text = darkTheme.colors.membership.starter.card.text = transparentize(
  0.13,
  darkTheme.colors.contrastColor,
);
darkTheme.colors.membership.elite.star =
  darkTheme.colors.membership.elite.star[0];

darkTheme.colors.membership.infinite.badge.background =
  darkTheme.colors.membership.infinite.badge[0];
darkTheme.colors.membership.infinite.badge.text =
  darkTheme.colors.membership.infinite.badge[1];
darkTheme.colors.membership.infinite.dashboard.gradient =
  darkTheme.colors.membership.infinite.dashboard[0];
darkTheme.colors.membership.infinite.card.background =
  darkTheme.colors.membership.infinite.card[0];
darkTheme.colors.membership.infinite.card.text = darkTheme.colors.membership.starter.card.text = transparentize(
  0.13,
  darkTheme.colors.contrastColor,
);
darkTheme.colors.membership.infinite.star =
  darkTheme.colors.membership.infinite.star[0];

darkTheme.colors.membership.infinite_privilege.badge.background =
  darkTheme.colors.membership.infinite_privilege.badge[0];
darkTheme.colors.membership.infinite_privilege.badge.text =
  darkTheme.colors.contrastColor;
darkTheme.colors.membership.infinite_privilege.border =
  darkTheme.colors.contrastColor;
darkTheme.colors.membership.infinite_privilege.dashboard.gradient =
  darkTheme.colors.membership.infinite_privilege.dashboard[0];
darkTheme.colors.membership.infinite_privilege.card.background =
  darkTheme.colors.membership.infinite_privilege.card[0];
darkTheme.colors.membership.infinite_privilege.card.text = darkTheme.colors.membership.starter.card.text = transparentize(
  0.13,
  darkTheme.colors.contrastColor,
);
darkTheme.colors.membership.infinite_privilege.star =
  darkTheme.colors.membership.infinite_privilege.star[0];

// tag
darkTheme.colors.tag.primary.background.transparent = transparentize(
  0.8,
  darkTheme.colors.primary.normal,
);
darkTheme.colors.tag.primary.background.normal =
  darkTheme.colors.primary.normal;
darkTheme.colors.tag.primary.text.transparent = darkTheme.colors.primary.normal;
darkTheme.colors.tag.primary.text.normal = darkTheme.colors.background1;

darkTheme.colors.tag.secondary.background.transparent = transparentize(
  0.8,
  darkTheme.colors.secondary.normal,
);
darkTheme.colors.tag.secondary.background.normal =
  darkTheme.colors.secondary.normal;
darkTheme.colors.tag.secondary.text.transparent =
  darkTheme.colors.secondary.normal;
darkTheme.colors.tag.secondary.text.normal = darkTheme.colors.background1;

darkTheme.colors.tag.contrast.background.transparent = transparentize(
  0.8,
  darkTheme.colors.contrastColor,
);
darkTheme.colors.tag.contrast.background.normal = transparentize(
  0.13,
  darkTheme.colors.contrastColor,
);
darkTheme.colors.tag.contrast.text.transparent = transparentize(
  0.4,
  darkTheme.colors.contrastColor,
);
darkTheme.colors.tag.contrast.text.normal = transparentize(
  0.4,
  darkTheme.colors.background1,
);

darkTheme.colors.tag.onBackground.background.transparent = transparentize(
  0.6,
  darkTheme.colors.background1,
);
darkTheme.colors.tag.onBackground.background.normal =
  darkTheme.colors.background1;
darkTheme.colors.tag.onBackground.text.transparent = transparentize(
  0.4,
  darkTheme.colors.contrastColor,
);
darkTheme.colors.tag.onBackground.text.normal = transparentize(
  0.4,
  darkTheme.colors.contrastColor,
);

// button
darkTheme.colors.buttonContrastBorderColor = transparentize(
  0.8,
  darkTheme.colors.secondary.normal,
);
darkTheme.colors.buttonContrastTextColor = darkTheme.colors.secondary.normal;

// others
darkTheme.colors.toggleOn.button = darkTheme.colors.secondary.normal;
darkTheme.colors.toggleOn.track = transparentize(
  0.62,
  darkTheme.colors.secondary.normal,
);
darkTheme.colors.toggleOff.button = transparentize(
  0.4,
  darkTheme.colors.contrastColor,
);
darkTheme.colors.toggleOff.track = transparentize(
  0.62,
  darkTheme.colors.contrastColor,
);

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
darkTheme.fonts.subTitle1 = darkTheme.fonts.body;
darkTheme.fonts.subTitle2 = darkTheme.fonts.body;
darkTheme.fonts.subTitle3 = darkTheme.fonts.body;
darkTheme.fonts.body1 = darkTheme.fonts.body;
darkTheme.fonts.body2 = darkTheme.fonts.body;
darkTheme.fonts.caption = darkTheme.fonts.body;
darkTheme.fonts.captionNew = darkTheme.fonts.body;
darkTheme.fonts.value = darkTheme.fonts.body;
darkTheme.fonts.button = darkTheme.fonts.body;
darkTheme.fonts.moreCompactButton = darkTheme.fonts.body;
darkTheme.fonts.label = darkTheme.fonts.body;
darkTheme.fonts.overline = darkTheme.fonts.body;
darkTheme.fonts.smallText = darkTheme.fonts.body;
darkTheme.fonts.initials1 = darkTheme.fonts.body;
darkTheme.fonts.initials2 = darkTheme.fonts.body;
darkTheme.fonts.initials3 = darkTheme.fonts.body;
darkTheme.fonts.unit11 = darkTheme.fonts.body;
darkTheme.fonts.unit16 = darkTheme.fonts.body;
darkTheme.fonts.digit12mono = darkTheme.fonts.body;
darkTheme.fonts.digit16mono = darkTheme.fonts.body;
darkTheme.fonts.digit36 = darkTheme.fonts.body;
darkTheme.fonts.digit36mono = darkTheme.fonts.body;
darkTheme.fonts.smallText = darkTheme.fonts.smallText;

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
darkTheme.fontSizes.moreCompactButton = darkTheme.fontSizes[0];
darkTheme.fontSizes.label = darkTheme.fontSizes[1];
darkTheme.fontSizes.overline = darkTheme.fontSizes[0];
darkTheme.fontSizes.smallText = darkTheme.fontSizes[1];
darkTheme.fontSizes.initials1 = darkTheme.fontSizes[6];
darkTheme.fontSizes.initials2 = darkTheme.fontSizes[8];
darkTheme.fontSizes.initials3 = darkTheme.fontSizes[9];
darkTheme.fontSizes.unit11 = darkTheme.fontSizes[10];
darkTheme.fontSizes.unit16 = darkTheme.fontSizes[3];
darkTheme.fontSizes.digit12mono = darkTheme.fontSizes[1];
darkTheme.fontSizes.digit16mono = darkTheme.fontSizes[3];
darkTheme.fontSizes.digit36 = darkTheme.fontSizes[8];
darkTheme.fontSizes.digit36mono = darkTheme.fontSizes[8];
darkTheme.fontSizes.smallText = darkTheme.fontSizes[1];

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
darkTheme.fontWeights.moreCompactButton = darkTheme.fontWeights[2];
darkTheme.fontWeights.label = darkTheme.fontWeights[3];
darkTheme.fontWeights.overline = darkTheme.fontWeights[2];
darkTheme.fontWeights.smallText = darkTheme.fontWeights[1];
darkTheme.fontWeights.initials1 = darkTheme.fontWeights[2];
darkTheme.fontWeights.initials2 = darkTheme.fontWeights[2];
darkTheme.fontWeights.initials3 = darkTheme.fontWeights[2];
darkTheme.fontWeights.unit11 = darkTheme.fontWeights[2];
darkTheme.fontWeights.unit16 = darkTheme.fontWeights[2];
darkTheme.fontWeights.digit12mono = darkTheme.fontWeights[1];
darkTheme.fontWeights.digit16mono = darkTheme.fontWeights[1];
darkTheme.fontWeights.digit36 = darkTheme.fontWeights[2];
darkTheme.fontWeights.digit36mono = darkTheme.fontWeights[2];
darkTheme.fontWeights.smallText = darkTheme.fontWeights[1];

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
darkTheme.lineHeights.moreCompactButton =
  darkTheme.fontSizes.moreCompactButton * 1.5;
darkTheme.lineHeights.label = darkTheme.fontSizes.label * 1.5;
darkTheme.lineHeights.overline = darkTheme.fontSizes.overline * 1.5;
darkTheme.lineHeights.smallText = darkTheme.fontSizes.smallText * 1.25;
darkTheme.lineHeights.initials1 = darkTheme.fontSizes.initials1 * 1.5;
darkTheme.lineHeights.initials2 = darkTheme.fontSizes.initials2 * 1.5;
darkTheme.lineHeights.initials3 = darkTheme.fontSizes.initials3 * 1.5;
darkTheme.lineHeights.unit11 = darkTheme.fontSizes.unit11 * 1.5;
darkTheme.lineHeights.unit16 = darkTheme.fontSizes.unit16 * 1.5;
darkTheme.lineHeights.digit12mono = darkTheme.fontSizes.digit12mono;
darkTheme.lineHeights.digit16mono = darkTheme.fontSizes.digit16mono;
darkTheme.lineHeights.digit36 = darkTheme.fontSizes.digit36;
darkTheme.lineHeights.digit36mono = darkTheme.fontSizes.digit36mono;
darkTheme.lineHeights.smallText = darkTheme.fontSizes.smallText * 1.25;
