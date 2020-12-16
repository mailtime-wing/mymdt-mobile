import {css} from '@emotion/native';
import {StyleSheet} from 'react-native';

export const container = (theme) => css`
  flex: 1;
  justify-content: space-between;
  margin-bottom: ${String(theme.space.marginBetweenContentAndScreenBottom)}px;
`;

export const cardSectionContainer = css`
  flex: 1;
`;

export const marginBetweenTopAndCarousel = css`
  flex-basis: 54;
  flex-shrink: 100;
`;

export const itemContainer = css`
  flex-shrink: 1;
`;

export const paddingHorizontal = css`
  padding-horizontal: 24px;
`;

export const itemContentContainer = css`
  ${paddingHorizontal};
  flex-shrink: 1;
`;

export const marginBetweenImageAndHeader = css`
  flex-basis: 40;
  flex-shrink: 1;
`;

export const headerStyle = (theme) => css`
  margin-bottom: 10px;
  color: ${theme.colors.secondary.normal};
  text-align: center;
`;

export const detailStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  text-align: center;
`;

export const image = css`
  flex-basis: 343px;
  flex-shrink: 1;
  aspect-ratio: 1;
  margin-left: auto;
  margin-right: auto;
`;

export const marginBetweenCarouselAndPagination = css`
  flex-basis: 58;
  flex-shrink: 7;
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
    marginBottom: 16,
  },
});
