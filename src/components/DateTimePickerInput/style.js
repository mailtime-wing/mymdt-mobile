import styled from '@emotion/native';
import Text from '@/components/AppText';

export const TextInput = styled.TextInput`
  padding: 14px 16px;
  font-size: 16px;
  line-height: 19px;
  color: ${props => props.theme.colors.contrastColor};
  ${props =>
    props.isError && `color: ${props.theme.colors.textOnError.normal};`};
`;

export const TextInputContainer = styled.View`
  border-radius: 8px;
  border: 2px solid transparent;
  margin: 4px 0;
  background-color: ${props => props.theme.colors.background2};
  ${props =>
    props.isError && `background-color: ${props.theme.colors.errorBackground}`};
  ${props =>
    props.isFocus &&
    `border: 2px solid ${props.theme.colors.secondary.normal}; 
    background-color: ${props.theme.colors.inputFocusBackground}`};
`;

export const Container = styled.View`
  min-width: 65%;
`;

export const Label = styled(Text)`
  color: ${props => props.theme.colors.contrastColor};
  ${props => props.isFocus && `color: ${props.theme.colors.secondary.normal};`};
  ${props =>
    props.isError && `color: ${props.theme.colors.textOnError.normal};`};
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  font-weight: bold;
  width: 150%;
  height: 16px;
  text-transform: uppercase;
`;

export const Remark = styled(Text)`
  font-size: 12px;
  line-height: 15px;
  color: ${props => props.theme.colors.textOnBackground.disabled};
`;

export const Error = styled(Text)`
  font-size: 12px;
  height: 16px;
  color: ${props => props.theme.colors.textOnError.superLight};
`;
