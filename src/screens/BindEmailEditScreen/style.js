import styled from '@emotion/native';
import Text from '@/components/AppText';

export const Container = styled.View`
  padding-left: 24px;
  padding-right: 24px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 24px;
  align-items: center;
`;

export const TitleText = styled(Text)`
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.black.superLight};
`;

export const CustomeSwitch = styled.Switch`
  border: 2px solid black;
  border-radius: 27px;
`;

export const ButtonContainer = styled.View`
  margin-top: 40px;
  padding: 0 70px;
`;

export const EmailText = styled(Text)`
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.75px;
`;

export const UnbindButton = styled.TouchableOpacity`
  border: 1px solid ${props => props.theme.colors.error.superLight};
  border-radius: 20px;
  padding: 6px 8px;
  height: auto;
`;

export const UnbindText = styled.Text`
  font-size: 14px;
  line-height: 17px;
  font-weight: bold;
  color: ${props => props.theme.colors.error.dark};
`;
