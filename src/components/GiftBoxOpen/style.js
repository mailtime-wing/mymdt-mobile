import styled from '@emotion/native';
import {Animated, StyleSheet} from 'react-native';

export const BoxBody = styled.Image`
  width: 126px;
  height: 98px;
  position: absolute;
  bottom: -20;
`;

export const Container = styled.View``;

export const Circle = styled.View`
  background-color: ${props => props.theme.colors.white.normal};
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
