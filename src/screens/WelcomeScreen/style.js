import styled, {css} from '@emotion/native';

export const titleStyle = theme => css`
  color: ${theme.colors.secondary.normal};
  margin-bottom: 29px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const detailStyle = theme => css`
  color: ${theme.colors.black.light};
  padding-left: 24px;
  padding-right: 24px;
`;

export const startAndAgree = theme => css`
  text-align: center;
  color: ${theme.colors.grey.dark};
  margin-top: 11px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const PaddingContainer = styled.View`
  padding-left: 24px;
  padding-right: 24px;
`;

export const AppIconGridImageContainer = styled.View`
  margin-top: 48px;
  margin-bottom: 48px;
`;

export const AppIconGridImage = styled.Image``;
