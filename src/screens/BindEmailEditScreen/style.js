import styled, {css} from '@emotion/native';

export const Container = styled.View`
  padding-left: 24px;
  padding-right: 24px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 24px;
  align-items: center;
`;

export const CustomeSwitch = styled.Switch`
  border: 2px solid black;
  border-radius: 27px;
`;

export const ButtonContainer = styled.View`
  margin-top: 40px;
  padding: 0 70px;
`;

export const UnbindButton = styled.TouchableOpacity`
  border: 1px solid ${props => props.theme.colors.error.superLight};
  border-radius: 20px;
  padding: 8px;
  height: auto;
`;

export const removeText = theme => css`
  color: ${theme.colors.error.dark};
`;

export const titleText = theme => css`
  color: ${theme.colors.black.superLight};
`;
