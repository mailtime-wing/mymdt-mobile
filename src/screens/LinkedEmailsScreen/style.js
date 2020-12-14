import styled, {css} from '@emotion/native';

export const Container = styled.View`
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 48px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 0;
  align-items: center;
`;

export const headerStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const CustomeSwitch = styled.Switch`
  border: 2px solid black;
  border-radius: 27px;
`;

export const MarginTop = styled.View`
  ${(props) => `margin-top: ${props.value || 8}px;`}
`;

export const emailStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const unbindButtonContainer = css`
  width: auto;
`;

export const detailStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  margin-bottom: 24px;
`;

export const noEmailStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
  margin-top: 24px;
  margin-bottom: 16px;
  text-align: center;
`;

export const Image = styled.Image`
  align-self: center;
`;

export const NoEmailContainer = styled.View`
  justify-items: center;
`;

export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.secondary.normal};
  opacity: ${(props) => props.disabled && '0.5'};

  text-transform: uppercase;
  justify-content: center;

  padding: 9.5px 12px;
  border-radius: 42px;

  flex-direction: row;
  width: auto;
  align-self: center;
`;
