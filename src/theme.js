const theme = {
  colors: {
    primary: ['#0363EF', '#0036C5'],
    secondary: ['#B5E8EE', '#21CEDB', '#3DB4C8'],
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
    black: ['rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.4)', '#000000'],
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
theme.colors.black.superLight = theme.colors.black[0];
theme.colors.black.light = theme.colors.black[1];
theme.colors.black.normal = theme.colors.black[2];

theme.colors.primary.normal = theme.colors.primary[0];
theme.colors.primary.dark = theme.colors.primary[1];
theme.colors.secondary.light = theme.colors.secondary[0];
theme.colors.secondary.normal = theme.colors.secondary[1];
theme.colors.secondary.dark = theme.colors.secondary[2];
theme.colors.blue.light = theme.colors.blue[0];
theme.colors.error.superLight = theme.colors.error[0];
theme.colors.error.light = theme.colors.error[1];
theme.colors.error.normal = theme.colors.error[2];
theme.colors.error.dark = theme.colors.error[3];

export default theme;
