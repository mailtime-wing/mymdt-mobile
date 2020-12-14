import styled, {css} from '@emotion/native';

export const headerDetailStyle = (theme) => css`
  margin-bottom: 40px;
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const detailStyle = (theme) => css`
  padding-top: 8px;
  padding-bottom: 16px;
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  width: 70%;
`;

export const headerStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const numberOfBrandStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ScrollContainer = styled.ScrollView``;

export const Container = styled.View`
  padding: 0 24px;
`;

export const Divider = styled.View`
  border: 1px solid ${(props) => props.theme.colors.background2};
  margin: 16px 0;
`;
