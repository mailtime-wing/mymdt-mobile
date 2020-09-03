import styled, {css} from '@emotion/native';
import {StyleSheet} from 'react-native';

export const Container = styled.View`
  padding-top: 76px;
  padding-bottom: 24px;
`;

export const ContentContainer = styled.View`
  padding-left: 24px;
  padding-right: 24px;
`;

export const ButtonContainer = styled.View`
  padding-left: 24px;
  padding-right: 24px;
`;

export const ColorBackground = styled.View`
  color: ${props => props.backgroundColor};
  aspect-ratio: 1;
  border-radius: 24px;
  margin-left: 16px;
  margin-right: 16px;
`;

export const headerStyle = theme => css`
  margin-top: 40px;
  margin-bottom: 10px;
  color: ${theme.colors.secondary.normal};
  text-align: center;
`;

export const detailStyle = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  text-align: center;
`;

export const MarginContainer = styled.View`
  margin-top: 12px;
`;

export const SwiperContainer = styled.View``;

export const styles = StyleSheet.create({
  container: {
    overflow: 'visible',
    height: 'auto',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  paginationContainer: {},
});
