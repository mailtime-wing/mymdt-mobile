import styled from '@emotion/native';
import Text from '@/components/AppText';

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
  background-color: ${props => props.theme.colors.black.extremeLight};
  ${props =>
    props.isError &&
    `background-color: ${props.theme.colors.error.superLight}`};
  ${props =>
    props.isFocus &&
    `border-color: ${props.theme.colors.secondary.normal}; 
    background-color: ${props.theme.colors.blue.light}`};
  ${props =>
    props.readOnly &&
    `border-color: transparent; 
    background-color: transparent`};
`;

export const Container = styled.View`
  min-width: 65%;
`;

export const Label = styled(Text)`
  color: ${props => props.theme.colors.black.normal};
  ${props => props.isFocus && `color: ${props.theme.colors.secondary.normal};`};
  ${props => props.isError && `color: ${props.theme.colors.error.dark};`};
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  font-weight: bold;
`;

export const Remark = styled(Text)`
  font-size: 12px;
  line-height: 15px;
  color: ${props => props.theme.colors.black.superLight};
`;

export const Error = styled(Text)`
  font-size: 12px;
  color: ${props => props.theme.colors.error.light};
`;
