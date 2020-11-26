import styled, {css} from '@emotion/native';
import {Animated, StyleSheet} from 'react-native';

export const gotRewardText = (theme) => css`
  color: ${theme.colors.secondary.dark};
  text-align: center;
`;

export const GiftIcon = styled.Image`
  width: 145px;
  height: 174px;
  align-self: center;
  margin-top: 64px;
  margin-bottom: 64px;
`;

export const container = css`
  flex: 1;
  justify-content: center;
`;

export const ContinueButton = styled.View`
  flex: 1;
`;

export const SmallCoin = styled.Image`
  width: 41px;
  height: 43px;
  margin-left: 16px;
`;

export const BoxBody = styled.Image`
  width: 126px;
  height: 98px;
  position: absolute;
  bottom: -20;
`;

export const Circle = styled.View`
  background-color: ${(props) => props.theme.colors.background1};
  width: 300px;
  height: 300px;
  border-radius: 150px;
  align-self: center;
  align-items: center;
`;

export const AnimatedView = styled(Animated.View)`
  position: absolute;
  left: 0;
  bottom: 0;
`;

export const gotContainer = css`
  flex: 1;
  justify-content: center;
  align-content: center;
  padding-horizontal: 24px;
`;

export const textContainer = css`
  margin-top: 30px;
  align-self: center;
`;

export const button = css`
  margin-top: 60px;
`;

export const styles = StyleSheet.create({
  animatedView: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  animatedViewShadow: {
    shadowColor: '#E9E5D0',
    shadowOffset: {width: 0, height: 15},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 1,
  },
  animatedViewShadowLong: {
    shadowOffset: {width: 0, height: 30},
  },
  animatedBoxHead: {
    right: 88,
    bottom: 75,
    position: 'absolute',
  },
});
