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
`;

export const Detail = styled.Text`
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 1px;
  margin-top: 20px;
`;

export const DatePicker = styled.DatePickerIOS`
  background-color: ${props => props.theme.colors.grey.light};
  margin-bottom: 10px;
`;

export const GenderContainer = styled.View`
  height: 48px;
  width: 80%;
  border: 1px solid ${props => props.theme.colors.black.normal};
  flex-direction: row;
  margin-bottom: 32px;
`;

export const Gender = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.active ? props.theme.colors.black.normal : 'transparent'};
  border-right: 10px solid ${props => props.theme.colors.black.normal};
`;

export const GenderText = styled.Text`
  color: ${props =>
    props.active
      ? props.theme.colors.white.normal
      : props.theme.colors.black.normal};
`;
