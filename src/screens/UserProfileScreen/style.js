import styled from '@emotion/native';

export const Container = styled.View`
  padding: 99px 30px 38px 30px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

export const Detail = styled.Text`
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 1px;
  margin-bottom: 48px;
`;

export const DatePicker = styled.DatePickerIOS`
  background-color: ${props => props.theme.colors.grey.light};
  margin-bottom: 10px;
`;

export const DateFieldContainer = styled.TouchableOpacity`
  margin-top: 32px;
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

export const GenderText = styled.Text`
  color: ${props =>
    props.active
      ? props.theme.colors.white.normal
      : props.theme.colors.black.normal};
`;

export const FormInputContainer = styled.View`
  margin-bottom: 24px;
`;

export const Error = styled.Text`
  font-size: 12px;
  color: red;
`;
