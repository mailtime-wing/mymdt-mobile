import {css} from '@emotion/native';
import {StyleSheet} from 'react-native';

export const container = css`
  padding-bottom: 24px;
`;

export const paddingHorizontal = css`
  padding-horizontal: 24px;
`;

export const headerStyle = (theme) => css`
  margin-top: 40px;
  margin-bottom: 10px;
  color: ${theme.colors.secondary.normal};
  text-align: center;
`;

export const detailStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  text-align: center;
`;

export const image = css`
  width: 100%;
`;

export const styles = StyleSheet.create({
  container: {
    overflow: 'visible',
    height: 'auto',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  paginationContainer: {
    paddingVertical: 0,
    marginTop: 60,
    marginBottom: 16,
  },
});
