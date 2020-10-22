import React from 'react';
import {View} from 'react-native';

import AppText from '@/components/AppText2';
import FormattedTransactionDate from '@/components/FormattedTransactionDate';

import {
  nameStyle,
  dateStyle,
  transaction,
  container,
  border,
  iconContainer,
} from './style';
import {useTheme} from 'emotion-theming';

const TransactionItem = ({title, date, icon, coin, style}) => {
  const theme = useTheme();
  return (
    <View style={[container, style]}>
      <View style={iconContainer}>{icon}</View>
      <View style={border(theme)}>
        <View style={transaction}>
          <AppText variant="body1" style={nameStyle(theme)} numberOfLines={1}>
            {title}
          </AppText>
          <AppText variant="caption" style={dateStyle(theme)}>
            <FormattedTransactionDate value={date} />
          </AppText>
        </View>
        {coin}
      </View>
    </View>
  );
};

export default TransactionItem;
