import styled from '@emotion/native';
import Text from '@/components/AppText';

export const Container = styled.KeyboardAvoidingView`
  padding-top: 68px;
`;

export const ScrollContainer = styled.ScrollView`
  padding-left: 24px;
  padding-right: 24px;
`;

export const FormContainer = styled.View`
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 36px;
  color: ${props => props.theme.colors.secondary.normal};
  line-height: 36px;
  letter-spacing: 1px;
  font-weight: 500;
  margin-bottom: 29px;
  text-transform: uppercase;
  font-family: 'Neo Sans Pro';
`;

export const Detail = styled(Text)`
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 1px;
  margin-bottom: 24px;
  color: ${props => props.theme.colors.black.light};
`;

export const RequiredText = styled(Text)`
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 1px;
  margin-bottom: 24px;
  margin-bottom: 24px;
  color: ${props => props.theme.colors.black.light};
`;

export const DateFieldContainer = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const GenderContainer = styled.View`
  height: 48px;
  width: 80%;
  border: 1px solid ${props => props.theme.colors.black.normal};
  flex-direction: row;
`;

export const Gender = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.active ? props.theme.colors.black.normal : 'transparent'};
`;

export const GenderText = styled(Text)`
  color: ${props =>
    props.active
      ? props.theme.colors.white.normal
      : props.theme.colors.black.normal};
`;

export const FormInputContainer = styled.View`
  margin-bottom: 24px;
`;

export const Error = styled(Text)`
  font-size: 12px;
  color: red;
`;
