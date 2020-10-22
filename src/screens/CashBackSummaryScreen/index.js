import React, {useLayoutEffect, useCallback} from 'react';
import {ScrollView, TouchableOpacity, Image, View} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedNumber} from 'react-intl';

import LinearGradient from 'react-native-linear-gradient';
import {
  image,
  banner,
  body,
  chip,
  currency as currencyStyle,
  amount as amountStyle,
  range as rangeStyle,
  firstChipMargin,
} from './style';

import AppIcon from '@/components/AppIcon';
import AppText from '@/components/AppText2';
import MissingCartIcon from '@/assets/icon_missed-shopping-cart.svg';

const SummaryChip = ({currency, amount, range, style}) => {
  const theme = useTheme();
  return (
    <View style={[chip(theme), style]}>
      <AppText variant="unit11" style={currencyStyle(theme)}>
        {currency}
      </AppText>
      <AppText variant="digit16mono" style={amountStyle(theme)}>
        <FormattedNumber
          value={amount}
          minimumFractionDigits={2}
          maximumFractionDigits={2}
        />
      </AppText>
      <AppText variant="smallText" style={rangeStyle(theme)}>
        {range}
      </AppText>
    </View>
  );
};

const CashBackSummaryScreen = ({navigation}) => {
  const handleMissingCartPress = useCallback(() => {
    navigation.navigate('missing_receipt');
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: {backgroundColor: '#E9FAFB'},
      headerBackground: () => (
        <LinearGradient colors={['#B0F8FD', '#E9FAFB']} />
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleMissingCartPress}>
          <AppIcon sizeVariant="small" svgIcon={MissingCartIcon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleMissingCartPress]);

  return (
    <ScrollView>
      <Image
        source={require('@/assets/cashback-history-background.png')}
        resizeMode="cover"
        style={image}
      />
      <View style={body}>
        <SummaryChip
          currency="USD"
          amount={10.12}
          range="In Past 7 Days"
          style={firstChipMargin}
        />
        <SummaryChip currency="USD" amount={1234.21} range="In Totals" />
        <Image
          style={banner}
          source={require('@/assets/upgrade_promotion_banner.png')}
          resizeMode="cover"
        />
      </View>
    </ScrollView>
  );
};

export default CashBackSummaryScreen;
