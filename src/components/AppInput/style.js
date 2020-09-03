import styled, {css} from '@emotion/native';

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
  ${props =>
    props.readOnly &&
    `border: 2px solid transparent; 
    background-color: transparent`};
`;

export const Container = styled.View`
  min-width: 65%;
`;

export const labelStyle = (theme, isFocus, isError) => css`
  color: ${theme.colors.contrastColor};
  ${isFocus && `color: ${theme.colors.secondary.normal};`};
  ${isError && `color: ${theme.colors.textOnError.normal};`};
`;

export const remarkStyle = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const errorStyle = theme => css`
  color: ${theme.colors.textOnError.light};
`;
