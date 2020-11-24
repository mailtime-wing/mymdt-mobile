import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedNumber} from 'react-intl';
import Clipboard from '@react-native-community/clipboard';

import AppText from '@/components/AppText2';

import CopyIcon from '@/assets/icon_copy.svg';
import AlertIcon from '@/assets/icon_alert-triangle.svg';

import {
  mediumEmphasis,
  highEmphasis,
  notEnought,
  depositAddress,
  inputContainer,
  rowContainer,
  copy,
  alert,
  copyText,
  textAlignCenter,
  alertContainer,
} from './style';
import {FormattedMessage} from 'react-intl';

const DepositMdt = ({depositAmount, address}) => {
  const theme = useTheme();

  const copyToClipboard = () => {
    Clipboard.setString(address);
  };

  return (
    <View>
      <View style={alertContainer(theme)}>
        <View style={[rowContainer, alert]}>
          <AlertIcon
            fill={theme.colors.textOnError.normal}
            stroke={theme.colors.textOnError.normal}
            strokeWidth={2}
          />
          <AppText variant="subTitle3" style={notEnought(theme)}>
            <FormattedMessage
              id="you_dont_have_enought_mdt"
              defaultMessage="You don’t have enough MDT"
            />
          </AppText>
        </View>
        <AppText
          variant="body2"
          style={[mediumEmphasis(theme), textAlignCenter]}>
          <FormattedMessage
            id="you_can_stake_after_transfer_mdt_to_deposit_address"
            defaultMessage="You can stake MDT after transfering {amount} MDT to the deposit address below."
            values={{amount: <FormattedNumber value={depositAmount} />}}
          />
        </AppText>
      </View>
      <AppText variant="label" style={[depositAddress, mediumEmphasis(theme)]}>
        <FormattedMessage
          id="mdt_deposit_address"
          defaultMessage="MDT Deposit Address"
        />
      </AppText>
      <View style={rowContainer}>
        <View style={inputContainer(theme)}>
          <TextInput
            multiline={true}
            textAlignVertical="top"
            value={address}
            style={highEmphasis(theme)}
            editable={false}
          />
        </View>
        <TouchableOpacity onPress={copyToClipboard} style={copy}>
          <CopyIcon
            fill={theme.colors.primary.normal}
            stroke={theme.colors.primary.normal}
            strokeWidth={2}
          />
          <AppText variant="button" style={copyText(theme)}>
            <FormattedMessage id="button.copy" defaultMessage="Copy" />
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DepositMdt;
