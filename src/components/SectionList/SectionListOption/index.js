import React from 'react';
import {
  MenuOptionContainer,
  MenuIcon,
  MenuOption,
  Arrow,
  IconTitle,
} from './style';

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
