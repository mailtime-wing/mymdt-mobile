import React from 'react';
import {SectionList, View} from 'react-native';
import ModalContainer from '@/components/ModalContainer';
import AppText from '@/components/AppText2';

import {
  section,
  sectionHeader,
  sectionFooter,
  title as titleStyle,
  detail,
  item as itemContainer,
} from './style';

import {useTheme} from 'emotion-theming';

const TransactionDetailScreen = ({route}) => {
  const theme = useTheme();
  const {item: transactionItem} = route.params;
  const transactionItemData = transactionItem.node?.data || {};

  const detailData = [];
  Object.keys(transactionItemData)
    .filter((key) => key !== '__typename')
    .forEach((key) => {
      detailData.push({
        key: key,
        value: transactionItemData[key],
      });
    });

  const data = [
    {title: transactionItem.node.type, data: []},
    {title: 'detail', data: detailData},
  ];

  const renderItem = ({item}) => (
    <View style={itemContainer}>
      <AppText variant="body1" style={titleStyle(theme)}>
        {item.key}
      </AppText>
      <AppText variant="body2" style={detail(theme)}>
        {item.value}
      </AppText>
    </View>
  );

  return (
    <ModalContainer>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({section: {title}}) => (
          <View style={section(theme)}>
            <AppText variant="label" style={sectionHeader(theme)}>
              {title}
            </AppText>
          </View>
        )}
        renderSectionFooter={() => <View style={sectionFooter} />}
      />
    </ModalContainer>
  );
};

export default TransactionDetailScreen;
