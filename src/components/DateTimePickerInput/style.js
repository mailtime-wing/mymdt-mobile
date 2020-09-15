import styled, {css} from '@emotion/native';

export const TextInput = styled.TextInput`
  padding: 14px 16px;
  font-size: 16px;
  line-height: 19px;
  color: ${props => props.theme.colors.contrastColor};
  ${props =>
    props.isError && `color: ${props.theme.colors.textOnError.normal};`};
`;

export const inputContainer = (theme, isFocus, isError) => css`
  border-radius: 8px;
  border: 2px solid transparent;
  margin: 4px 0;
  background-color: ${theme.colors.background2};
  ${isError && `background-color: ${theme.colors.errorBackground}`};
  ${isFocus &&
    `border: 2px solid ${theme.colors.secondary.normal}; 
    background-color: ${theme.colors.inputFocusBackground}`};
`;

export const labelStyle = (theme, isFocus, isError) => css`
  color: ${theme.colors.contrastColor};
  ${isFocus && `color: ${theme.colors.secondary.normal};`};
  ${isError && `color: ${theme.colors.textOnError.normal};`};
`;
