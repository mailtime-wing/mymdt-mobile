import styled from '@emotion/native';

export const MenuOptionContainer = styled.TouchableOpacity`
  padding: 0 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  margin-bottom: 12px;
`;

export const MenuIcon = styled.View`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  border-radius: ${props => `${props.size / 2}px`};
  background-color: ${props => props.theme.colors.black};
  margin-right: 12px;
`;

export const MenuOption = styled.Text`
  font-size: 16px;
`;

export const Arrow = styled.Image``;

export const IconTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;
