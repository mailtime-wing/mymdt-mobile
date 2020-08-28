import styled, {css} from '@emotion/native';

export const Container = styled.View`
  padding: 0 24px;
  padding-bottom: 24px;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 0;
`;

export const RowHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const QuestionMark = styled.TouchableOpacity`
  margin-left: 4px;
`;

export const rowHeader = theme => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const rowValue = theme => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const formContainer = css`
  margin-bottom: 40px;
`;
