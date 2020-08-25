import styled from '@emotion/native';
import {Platform} from 'react-native';
import Text from '@/components/AppText';
import TitleText from '@/components/TitleText';

export const Container = styled.View`
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 48px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 0;
  align-items: center;
`;

export const HeaderText = styled(Text)`
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.textOnBackground.disabled};
`;

export const CustomeSwitch = styled.Switch`
  border: 2px solid black;
  border-radius: 27px;
`;

export const MarginTop = styled.View`
  ${props => `margin-top: ${props.value || 8}px;`}
`;

export const EmailText = styled(Text)`
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.75px;
`;

export const UnbindButton = styled.TouchableOpacity`
  border: 1px solid ${props => props.theme.colors.errorBackground};
  border-radius: 20px;
  padding: 6px 8px;
  height: auto;
`;

export const UnbindText = styled.Text`
  font-size: 14px;
  line-height: 17px;
  font-weight: bold;
  color: ${props => props.theme.colors.textOnError.normal};
  text-transform: uppercase;
`;

export const DetailText = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.textOnBackground.disabled};
  margin-bottom: 24px;
`;

export const NoEmailText = styled(TitleText)`
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: ${props => props.theme.colors.textOnBackground.disabled};
  margin-top: 24px;
  margin-bottom: 16px;
  text-align: center;
`;

export const Image = styled.Image`
  align-self: center;
`;

export const NoEmailContainer = styled.View`
  justify-items: center;
`;

export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.secondary.normal};
  opacity: ${props => props.disabled && '0.5'};

  text-transform: uppercase;
  justify-content: center;

  padding: 9.5px 12px;
  border-radius: 42px;

  flex-direction: row;
  width: auto;
  align-self: center;
`;

export const ButtonText = styled(Text)`
  color: ${props => props.theme.colors.background1};
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  ${Platform.OS === 'ios' && 'font-weight: bold;'};
  margin-left: 8px;
`;
