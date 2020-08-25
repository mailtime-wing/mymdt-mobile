import styled from '@emotion/native';
import {Platform} from 'react-native';
import TitleText from '@/components/TitleText';

export const Card = styled.View`
  padding: 8px;
  background-color: transparent;
  width: 80px;
  border: 1px solid ${props => props.theme.colors.background3};
  border-radius: 16px;
  margin: 0 4px;
  ${props =>
    props.isToday &&
    `border: 2px solid ${props.theme.colors.secondary.normal};
    `};
  ${props =>
    props.passedDay &&
    `background-color: ${props.theme.colors.secondary.normal};
    `};
`;

export const DayNumberTextEnglish = styled(TitleText)`
  font-size: 36px;
  margin-top: 4px;
  margin-bottom: 8px;
  ${Platform.OS === 'ios' && 'font-weight: 500;'};
  color: ${props => props.theme.colors.contrastColor};
  text-align: center;
  ${props =>
    props.isToday &&
    `color: ${props.theme.colors.secondary.dark};
    `}
  ${props =>
    props.passedDay &&
    `color: ${props.theme.colors.background1};
    `};
`;

export const DayTextEnglish = styled(TitleText)`
  font-size: 12px;
  ${Platform.OS === 'ios' && 'font-weight: 500;'};
  color: ${props => props.theme.colors.contrastColor};
  text-align: center;
  text-transform: uppercase;
  ${props =>
    props.isToday &&
    `color: ${props.theme.colors.secondary.dark};
    `}
  ${props =>
    props.passedDay &&
    `color: ${props.theme.colors.background1};
    `};
`;

export const DayNumberTextChinese = styled(TitleText)`
  font-size: 36px;
  line-height: 36px;
  ${Platform.OS === 'ios' && 'font-weight: 500;'};
  color: ${props => props.theme.colors.contrastColor};
  text-align: center;
  ${props =>
    props.isToday &&
    `color: ${props.theme.colors.secondary.dark};
    `}
  ${props =>
    props.passedDay &&
    `color: ${props.theme.colors.background1};
    `};
`;

export const DayTextChinese = styled(TitleText)`
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: 8px;
  ${Platform.OS === 'ios' && 'font-weight: 500;'};
  color: ${props => props.theme.colors.contrastColor};
  text-align: center;
  text-transform: uppercase;
  ${props =>
    props.isToday &&
    `color: ${props.theme.colors.secondary.dark};
    `}
  ${props =>
    props.passedDay &&
    `color: ${props.theme.colors.background1};
    `};
`;
