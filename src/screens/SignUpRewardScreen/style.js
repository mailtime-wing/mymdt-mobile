import styled, {css} from '@emotion/native';
import {Animated, StyleSheet} from 'react-native';
import Text from '@/components/AppText';
import TitleText from '@/components/TitleText';

export const GotRewardText = styled(TitleText)`
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
  color: ${props => props.theme.colors.secondary.dark};
  text-align: center;
`;

export const OpenText = styled(TitleText)`
  font-size: 36px;
  line-height: 43px;
  font-weight: 500;
  color: ${props => props.theme.colors.secondary.dark};
  text-align: center;
  font-weight: bold;
`;

export const YouGotRewardAmountText = styled(TitleText)`
  font-size: 36px;
  line-height: 43px;
  font-weight: 500;
  color: ${props => props.theme.colors.secondary.dark};
  text-align: center;
  font-weight: bold;
  align-self: flex-end;
`;

export const GiftIcon = styled.Image`
  width: 145px;
  height: 174px;
  align-self: center;
  margin-top: 64px;
  margin-bottom: 64px;
`;

export const TouchableContainer = styled.TouchableOpacity``;

export const Container = styled.View`
  flex: 7;
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
  background-color: ${props => props.theme.colors.background1};
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

export const TextContainer = styled.View`
  margin-top: 30px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const RewardAmount = styled(Text)`
  font-size: 48px;
  line-height: 58px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.8);
  margin-left: 8px;
`;

export const buttonContainer = css`
  width: 90%;
  align-self: center;
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
