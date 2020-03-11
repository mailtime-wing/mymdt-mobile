import React from 'react';
import {View} from 'react-native';
import SectionListOption from './SectionListOption';
import {Spearator, MenuList, ListTitle} from './style';

const SectionList = ({listTitle, listItem, ...props}) => (
  <View>
    <ListTitle>{listTitle}</ListTitle>
    <Spearator />
    <MenuList
      data={listItem}
      renderItem={({item, index}) => (
        <SectionListOption
          size={24}
          itemKey={item.key.toString()}
          itemName={item.value}
          {...props}
        />
      )}
    />
  </View>
);

export default SectionList;
