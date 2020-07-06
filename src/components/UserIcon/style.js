import styled from '@emotion/native';

export const AccountIcon = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.colors.black.extremeLight};
`;

export const UserIconContainer = styled.TouchableOpacity`
  flex: 1;
`;
