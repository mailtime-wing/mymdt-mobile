import {StyleSheet} from 'react-native';
import {css} from '@emotion/native';

export const container = css`
  align-self: flex-start;
`;

export const styles = theme =>
  StyleSheet.create({
    // passing border-related styles to <Image /> using emotion cause warning. Use native StyleSheet instead
    accountIcon: {
      borderRadius: 20,
      borderColor: theme.colors.background2,
      borderWidth: 1,
    },
  });
