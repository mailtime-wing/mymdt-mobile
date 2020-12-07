import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedMessage} from 'react-intl';

import TransactionsHistory from '@/components/TransactionsHistory';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import ArrowIcon from '@/assets/list_arrow.svg';

import {
  historyHeaderContainer,
  cashBackTitle,
  background as historyBackground,
  moreContainer,
} from './style';

const MrpTransactionHistory = ({style, navigation, currencyCode, ...props}) => {
  const theme = useTheme();

  return (
    <View style={style}>
      <TransactionsHistory
        headerComponent={
          <View style={historyHeaderContainer(theme)}>
            <AppText variant="heading5" style={cashBackTitle(theme)}>
              <FormattedMessage
                id="recent_transactions"
                defaultMessage="Recent Transactions"
              />
            </AppText>
            <View style={moreContainer}>
              <AppButton
                onPress={() =>
                  navigation.navigate('transaction_detail_more', {
                    currencyCode: currencyCode,
                    iconColor: theme.colors.secondary.normal,
                  })
                }
                variant="transparent"
                sizeVariant="compact"
                colorVariant="secondary"
                text={<FormattedMessage id="button.more" />}
                textPropsStyle={{
                  color: theme.colors.textOnBackground.mediumEmphasis,
                }}
              />
              <ArrowIcon
                stroke={theme.colors.textOnBackground.mediumEmphasis}
                strokeWidth={2}
              />
            </View>
          </View>
        }
        currencyCode={currencyCode}
        navigation={navigation}
        style={historyBackground(theme)}
        {...props}
      />
    </View>
  );
};

export default MrpTransactionHistory;
