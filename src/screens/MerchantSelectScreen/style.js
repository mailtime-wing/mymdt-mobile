import styled, {css} from '@emotion/native';

export const ScrollContainer = styled.ScrollView`
  padding-left: 24px;
  padding-right: 24px;
`;

export const detailStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  margin-bottom: 30px;
`;

export const titleStyle = (theme) => css`
  color: ${theme.colors.secondary.normal};
  margin-bottom: 30px;
`;

export const hightLightText = (theme) => css`
  color: ${theme.colors.secondary.dark};
`;

export const Container = styled.View`
  flex: 1;
`;

export const FixedContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 110px;
  border-width: 1px;
  border-radius: 24px 24px 0px 0px;
  border-color: ${(props) => props.theme.colors.borderColor};
  elevation: 1;
`;

export const brandSelectedText = (theme, isError) => css`
  color: ${isError
    ? theme.colors.textOnError.normal
    : theme.colors.secondary.normal};
  margin-top: 16px;
  margin-bottom: 16px;
  max-width: 40%;
  text-align: left;
`;
