import styled from '@emotion/native';
import Text from '@/components/AppText';
import TitleText from '@/components/TitleText';

export const Container = styled.View``;

export const FormContainer = styled.View`
  padding: 0 24px;
`;

export const ProfilePictureText = styled(Text)`
  color: ${props => props.theme.colors.black.normal};
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const UserIcon = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

export const ProfilePictureContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const UserIconContainer = styled.TouchableOpacity`
  align-self: flex-end;
`;

export const GenderText = styled(Text)``;

export const FillIcon = styled.Image`
  position: absolute;
  right: -8;
  bottom: 0;
`;

export const OptionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;

export const Input = styled.TextInput`
  color: black;
`;

export const EditMode = styled.View``;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Modal = styled.Modal`
  padding: 0 30px;
`;

export const DateFieldContainer = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const Error = styled(TitleText)`
  font-size: 12px;
  color: ${props => props.theme.colors.error.dark};
`;

export const ScrollContainer = styled.ScrollView``;
