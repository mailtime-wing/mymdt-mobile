import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FormattedDate} from 'react-intl';

import AppText from '@/components/AppText2';
import AppIcon from '@/components/AppIcon';

import {nameStyle, dateStyle, transaction, container} from './style';
import {useTheme} from 'emotion-theming';
import {MEASURABLE_REWARD_POINT} from '@/constants/currency';

const TransactionItem = ({item, cardType, coin, navigation}) => {
  const theme = useTheme();

  const handleTransactionPress = () => {
    navigation.navigate('transaction_detail', {item: item});
  };

  return (
    <TouchableOpacity style={container} onPress={handleTransactionPress}>
      <AppIcon
        color={theme.colors.background1}
        backgroundColor={
          cardType === MEASURABLE_REWARD_POINT
            ? theme.colors.secondary.normal
            : theme.colors.primary.normal
        }
        sizeVariant="small"
        svgIcon={item.icon}
      />
      <View style={transaction}>
        <AppText variant="body1" style={nameStyle(theme)}>
          {item.node.title}
        </AppText>
        <AppText variant="caption" style={dateStyle(theme)}>
          <FormattedDate
            value={item.node.transactionTime}
            year="numeric"
            month="long"
            day="2-digit"
          />
        </AppText>
      </View>
      {coin}
    </TouchableOpacity>
  );
};

export default TransactionItem;
