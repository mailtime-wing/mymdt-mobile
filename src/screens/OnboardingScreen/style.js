import {css} from '@emotion/native';
import {StyleSheet} from 'react-native';

export const container = css`
  flex: 1;
  padding-bottom: 24px;
  justify-content: space-between;
`;

export const cardSectionContainer = css`
  flex: 1;
`;

export const separator = css`
  flex-basis: 54;
  flex-shrink: 100;
`;

export const carouselContainer = css`
  flex-shrink: 1;
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
  height: 343px;
  aspect-ratio: 1;
  margin-left: auto;
  margin-right: auto;
`;

export const styles = StyleSheet.create({
  container: {
    overflow: 'visible',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  paginationContainer: {
    paddingVertical: 0,
    marginTop: 58,
    marginBottom: 16,
  },
});
