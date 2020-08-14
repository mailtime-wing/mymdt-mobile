import styled, {css} from '@emotion/native';

export const ScrollContainer = styled.ScrollView`
  padding-left: 24px;
  padding-right: 24px;
`;

export const detailStyle = theme => css`
  color: ${theme.colors.black.light};
  margin-bottom: 30px;
`;

export const titleStyle = theme => css`
  color: ${theme.colors.secondary.normal};
  margin-bottom: 30px;
`;

export const hightLightText = theme => css`
  color: ${theme.colors.secondary.normal};
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
  border-color: rgba(0, 0, 0, 0.2);
  elevation: 1;
`;

export const brandSelectedText = (theme, isError) => css`
  color: ${isError ? theme.colors.error.dark : theme.colors.secondary.normal};
  margin-top: 16px;
  margin-bottom: 16px;
  max-width: 40%;
  text-align: left;
`;
