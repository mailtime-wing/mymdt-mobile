import {css} from '@emotion/native';
import {StyleSheet} from 'react-native';

export const card = css`
  border-radius: 24px;
  margin-horizontal: 24px;
  margin-vertical: 16px;
  padding: 24px;
  height: 560px;
`;

export const currentStyle = theme => css`
  color: ${theme.colors.secondary.normal};
  text-align: center;
`;

export const highEmphasis = theme => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
  text-align: center;
`;

export const mediumEmphasis = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  text-align: center;
`;

export const level = css`
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const privilege = css`
  margin-top: 40px;
  margin-bottom: 8px;
`;

export const requirement = css`
  margin-top: 24px;
`;

export const requirementsContainer = css`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const button = css`
  align-self: center;
  margin-top: auto;
`;

export const styles = StyleSheet.create({
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  paginationContainer: {
    paddingVertical: 0,
    marginTop: 8,
    marginBottom: 48,
  },
});
