import React from 'react';
import styled from '@emotion/native';
import SectionListOption from './SectionListOption';

const Spearator = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colors.grey.normal};
  margin-top: 5px;
  margin-bottom: 18px;
  width: 100%;
`;

const MenuList = styled.FlatList`
  margin-bottom: 12px;
`;

const ListTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  padding: 0 30px;
`;

const SectionList = ({listTitle, listItem, ...props}) => (
  <>
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
  </>
);

export default SectionList;
