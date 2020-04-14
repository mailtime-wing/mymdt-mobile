const theme = {
  colors: {
    grey: ['#EEEEEE', '#DFDFDF', '#C6C6C6', '#AAAAAA', '#7B7B7B', '#797979'],
    white: ['#FFFFFF', '#F2F2F2'],
    black: ['rgba(0, 0, 0, 0.17)', '#000000'],
    gold: '#FFDF6F',
  },
};

theme.colors.grey.superLight = theme.colors.grey[0];
theme.colors.grey.light = theme.colors.grey[1];
theme.colors.grey.normal = theme.colors.grey[2];
theme.colors.grey.dark = theme.colors.grey[3];
theme.colors.grey.superDark = theme.colors.grey[4];
theme.colors.grey.extremeDark = theme.colors.grey[5];
theme.colors.white.normal = theme.colors.white[0];
theme.colors.white.dark = theme.colors.white[1];
theme.colors.black.light = theme.colors.black[0];
theme.colors.black.normal = theme.colors.black[1];

export default theme;
