import styled from '@emotion/native';
import {Platform} from 'react-native';
import Text from '@/components/AppText';
import TitleText from '@/components/TitleText';

export const VerificationContainer = styled.View`
  margin-top: 24px;
  margin-bottom: 46px;
`;

export const Title = styled(TitleText)`
  font-size: 36px;
  color: ${props => props.theme.colors.secondary.normal};
  line-height: 36px;
  letter-spacing: 2px;
  ${Platform.OS === 'ios' && 'font-weight: bold;'}
  margin-bottom: 29px;
  text-transform: uppercase;
`;

export const Container = styled.View`
  margin-top: 136px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const VerifyDetail = styled(Text)`
  font-size: 16px;
  line-height: 24px;
`;

export const ResendCodeButton = styled.TouchableOpacity``;

export const ResendCode = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  text-decoration: underline;
  text-decoration-color: ${props => props.theme.colors.secondary.border};
  color: ${props => props.theme.colors.secondary.border};
`;
