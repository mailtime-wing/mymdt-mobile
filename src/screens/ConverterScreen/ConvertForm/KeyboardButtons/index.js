import React, {useEffect} from 'react';
import {FormattedMessage} from 'react-intl';
import {View, InputAccessoryView, TouchableOpacity} from 'react-native';
import {useTheme} from 'emotion-theming';

import {GET_CURRENCY_BALANCE_API} from '@/api/data';
import useLazyQueryWithAuth from '@/hooks/useLazyQueryWithAuth';

import {
  inputAccessoryButton,
  inputAccessoryViewContainer,
  inputAccessoryButtonText,
} from './style';

import AppText from '@/components/AppText2';
import LoadingSpinner from '@/components/LoadingSpinner';

const KeyboardButtons = ({
  inputAccessoryViewID,
  handleAmountValueOnChange,
  from,
}) => {
  const theme = useTheme();
  const [getBalance, {data, loading}] = useLazyQueryWithAuth(
    GET_CURRENCY_BALANCE_API,
    {
      fetchPolicy: 'network-only',
    },
  );

  useEffect(() => {
    if (data) {
      handleAmountValueOnChange(
        data?.userProfile?.currencyAccounts[0]?.balance || 0,
      );
    }
  }, [data, handleAmountValueOnChange]);

  const handleConvertAllPress = () => {
    getBalance({
      variables: {
        currencyCode: from,
      },
    });
  };

  return (
    <InputAccessoryView nativeID={inputAccessoryViewID}>
      <View style={inputAccessoryViewContainer(theme)}>
        <TouchableOpacity
          onPress={() => handleAmountValueOnChange(0)}
          style={inputAccessoryButton(theme)}>
          <AppText variant="button" style={inputAccessoryButtonText(theme)}>
            <FormattedMessage id="button.clear" defaultMessage="clear" />
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleConvertAllPress}
          style={inputAccessoryButton(theme)}>
          {loading ? (
            <LoadingSpinner size="small" />
          ) : (
            <AppText variant="button" style={inputAccessoryButtonText(theme)}>
              <FormattedMessage
                id="button.convert_all"
                defaultMessage="Convert all"
              />
            </AppText>
          )}
        </TouchableOpacity>
      </View>
    </InputAccessoryView>
  );
};

export default KeyboardButtons;
