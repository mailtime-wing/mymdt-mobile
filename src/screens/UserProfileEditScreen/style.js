import styled from '@emotion/native';
import {Platform} from 'react-native';
import Text from '@/components/AppText';
import TitleText from '@/components/TitleText';

export const Container = styled.View``;

export const FormContainer = styled.View`
  padding: 0 24px;
`;

export const ProfilePictureText = styled(Text)`
  color: ${props => props.theme.colors.contrastColor};
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

export const ProfilePictureEditingContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const ProfilePictureContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

export const UserIconContainer = styled.TouchableOpacity`
  align-self: flex-end;
`;

export const FillIcon = styled.Image`
  position: absolute;
  right: -8;
  bottom: 0;
`;

export const DateFieldContainer = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const Error = styled(TitleText)`
  font-size: 12px;
  color: ${props => props.theme.colors.textOnError.normal};
`;

export const Name = styled(Text)`
  font-size: 18px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.8);
  ${Platform.OS === 'ios' && 'font-weight: 600;'}
  margin-left: 24px;
`;

export const MarginTop = styled.View`
  margin-top: 48px;
`;
