import styled from '@emotion/native';

export const TextInput = styled.TextInput`
  padding: 14px 16px;
  font-size: 16px;
  line-height: 19px;
  color: ${props => props.theme.colors.black.normal};
  ${props => props.isError && `color: ${props.theme.colors.error.dark};`};
`;

export const TextInputContainer = styled.View`
  border-radius: 8px;
  border: 2px solid;
  border-color: transparent;
  margin: 4px 0;
  background-color: ${props => props.theme.colors.black.superLight};
  ${props =>
    props.isError && `background-color: ${props.theme.colors.error.light}`};
  ${props =>
    props.isFocus &&
    `border-color: ${props.theme.colors.secondary.normal}; 
    background-color: ${props.theme.colors.blue.light}`};
`;

export const Container = styled.View`
  min-width: 65%;
`;

export const Label = styled.Text`
  color: ${props => props.theme.colors.black.normal};
  ${props => props.isFocus && `color: ${props.theme.colors.secondary.normal};`};
  ${props => props.isError && `color: ${props.theme.colors.error.dark};`};
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 1px;
  font-weight: bold;
`;

export const Remark = styled.Text`
  font-size: 14px;
  line-height: 17px;
  margin-top: 5px;
`;

export const Error = styled.Text`
  font-size: 12px;
  color: red;
`;
