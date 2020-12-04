import styled, {css} from '@emotion/native';
import ScreenContainer from '@/components/ScreenContainer';

export const Container = styled(ScreenContainer)`
  padding-bottom: 24px;
  align-items: center;
`;

export const bodyContainer = css`
  padding-horizontal: 24px;
`;

export const container = (theme) => css`
  flex: 1;
  background: ${theme.colors.themeBackground};
`;

export const inner = css`
  flex: 1;
  justify-content: space-between;
  padding-bottom: 24px;
`;

export const backgroundImage = css`
  align-self: center;
  margin-bottom: 16px;
`;

export const titleStyle = (theme) => css`
  color: ${theme.colors.textOnThemeBackground.highEmphasis};
  text-align: center;
  margin-bottom: 16px;
`;

export const detailStyle = (theme) => css`
  color: ${theme.colors.textOnThemeBackground.mediumEmphasis};
  text-align: center;
  margin-bottom: 16px;
`;

export const button = css`
  margin-horizontal: 24px;
`;

export const scale = css`
  height: 178px;
  aspect-ratio: 1.5;
`;
