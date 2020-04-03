import styled from '@emotion/native';

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

export const GenderText = styled.Text`
  color: ${props =>
    props.active
      ? props.theme.colors.white.normal
      : props.theme.colors.black.normal};
`;

export const FormInputContainer = styled.View`
  margin-bottom: 24px;
`;
