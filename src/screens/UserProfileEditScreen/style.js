import styled from '@emotion/native';

export const Container = styled.View``;

export const UserIcon = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

export const Text = styled.Text`
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.5px;
  color: black;
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

export const DatePickerContainer = styled.View`
  height: 45px;
  /* border-bottom-width: 1px; */
  flex-direction: row;
  justify-content: space-between;
`;
export const DatePickerButton = styled.TouchableOpacity`
  height: 100%;
  align-items: center;
  justify-content: center;
`;
export const DatePickerButtonDone = styled.Text`
  font-size: 18px;
  color: #006bff;
`;
export const DatePickerButtonCancel = styled.Text`
  font-size: 18px;
  color: red;
`;

export const DatePickerIOS = styled.DatePickerIOS`
  background-color: ${props => props.theme.colors.grey.light};
  color: black;
`;
