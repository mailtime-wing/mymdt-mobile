import styled, {css} from '@emotion/native';
import ScreenContainer from '@/components/ScreenContainer';

export const Container = styled(ScreenContainer)`
  margin-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const titleStyle = theme => css`
  color: ${theme.colors.secondary.normal};
  text-align: center;
  margin-bottom: 16px;
`;

export const detailStyle = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  text-align: center;
  margin-top: 16px;
  margin-bottom: 64px;
`;

export const MarginContainer = styled.View`
  margin-top: 16px;
`;

export const notificationPermission = css`
  align-self: center;
`;

export const arrowUp = css`
  margin-left: 60%;
  margin-top: 8px;
  margin-bottom: 72px;
`;
