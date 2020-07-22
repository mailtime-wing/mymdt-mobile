import styled from '@emotion/native';
import {Platform} from 'react-native';
import TitleText from '@/components/TitleText';
import Text from '@/components/AppText';

export const Container = styled.View`
  margin-bottom: 24px;
`;

export const HorizontalScrollContainer = styled.ScrollView`
  background: transparent;
  padding-bottom: 24px;
`;

export const Card = styled.View`
  padding: 8px;
  background-color: transparent;
  width: 80px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  margin: 0 4px;
  ${props =>
    props.today &&
    `border: 1px solid #ABEBEE;
    `};
  ${props =>
    props.passedDay &&
    `background-color: ${props.theme.colors.secondary.normal};
    `};
`;

export const CardNumberText = styled(TitleText)`
  font-size: 36px;
  ${Platform.OS === 'ios' && 'font-weight: 500;'};
  color: ${props => props.theme.colors.black.normal};
  text-align: center;
  ${props =>
    props.today &&
    `color: ${props.theme.colors.secondary.dark};
    `}
  ${props =>
    props.passedDay &&
    `color: ${props.theme.colors.white.normal};
    `};
`;

export const CardText = styled(TitleText)`
  font-size: 18px;
  margin-bottom: 8px;
  ${Platform.OS === 'ios' && 'font-weight: 500;'};
  color: ${props => props.theme.colors.black.normal};
  text-align: center;
  text-transform: uppercase;
  ${props =>
    props.today &&
    `color: ${props.theme.colors.secondary.dark};
    `}
  ${props =>
    props.passedDay &&
    `color: ${props.theme.colors.white.normal};
    `};
`;

export const GotCheckInRewardText = styled(TitleText)`
  font-size: 20px;
  line-height: 24px;
  ${Platform.OS === 'ios' && 'font-weight: 500;'}
  color: ${props =>
    props.color ? props.color : props.theme.colors.black.normal};
  text-align: center;
  margin-bottom: 8px;
`;

export const CovertedContainer = styled.View`
  flex: row;
`;

export const ConvertedText = styled(Text)`
  font-size: 14px;
  line-height: 21px;
  color: ${props => props.theme.colors.black.superLight};
  text-align: center;
`;

export const MarginTop = styled.View`
  margin-top: 16px;
`;
