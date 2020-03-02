import React from 'react';
import styled from '@emotion/native';

const MenuOptionContainer = styled.TouchableOpacity`
  padding: 0 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const MenuIcon = styled.View`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  border-radius: ${props => `${props.size / 2}px`};
  background-color: ${props => props.theme.colors.black};
  margin-right: 12px;
`;

const MenuOption = styled.Text`
  font-size: 16px;
`;

const Arrow = styled.Image``;
const IconTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SectionListOption = ({size, itemKey, itemName, navigation}) => (
  <MenuOptionContainer onPress={() => navigation.navigate(itemKey)}>
    <IconTitle>
      <MenuIcon size={size || 24} />
      <MenuOption>{itemName}</MenuOption>
    </IconTitle>
    <Arrow source={require('@/assets/black_arrow.png')} />
  </MenuOptionContainer>
);

export default SectionListOption;
