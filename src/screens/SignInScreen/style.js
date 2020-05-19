import styled from '@emotion/native';
import Text, {TitleText} from '@/components/AppText';

export const VerificationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 21px;
  margin-bottom: 37px;
`;

export const VerificationCodeContainer = styled.View`
  margin-right: 16px;
  flex: 1;
`;

export const Title = styled(TitleText)`
  font-size: 36px;
  color: ${props => props.theme.colors.secondary.normal};
  line-height: 36px;
  letter-spacing: 2px;
  font-weight: 500;
  margin-bottom: 29px;
  text-transform: uppercase;
`;

export const Container = styled.View`
  margin-top: 136px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const LoginAndAgree = styled(Text)`
  font-size: 10px;
  color: ${props => props.theme.colors.black.light};
  line-height: 18px;
  margin-top: 11px;
  padding: 0 24px;
  text-align: center;
`;

export const PhoneSectionContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PhonePrefixContainer = styled.View`
  margin-right: 8px;
  flex: 1;
`;

export const PhoneContainer = styled.View`
  flex: 2;
`;

export const SignUpDetail = styled(Text)`
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  margin-top: 131px;
  margin-bottom: 8px;
`;
