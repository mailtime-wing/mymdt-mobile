import React from 'react';
import {View} from 'react-native';
import formatToTransactionTime from '@/utils/formatToTransactionTime';

import AppText from '@/components/AppText2';
import AppIcon from '@/components/AppIcon';

import {nameStyle, dateStyle, transaction, container} from './style';
import {useTheme} from 'emotion-theming';

const TransactionItem = ({
  title,
  date,
  icon,
  coin,
  coinBackgroundColor,
  style,
}) => {
  const theme = useTheme();
  return (
    <View style={[container, style]}>
      {icon && (
        <AppIcon
          color={theme.colors.background1}
          backgroundColor={coinBackgroundColor}
          sizeVariant="small"
          svgIcon={icon}
        />
      )}
      <View style={transaction}>
        <AppText variant="body1" style={nameStyle(theme)} numberOfLines={1}>
          {title}
        </AppText>
        <AppText variant="caption" style={dateStyle(theme)}>
          {formatToTransactionTime(date)}
        </AppText>
      </View>
      {coin}
    </View>
  );
};

export default TransactionItem;
