import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedNumber} from 'react-intl';
import Clipboard from '@react-native-community/clipboard';

import AppText from '@/components/AppText2';

import CopyIcon from '@/assets/icon_copy.svg';
import AlertIcon from '@/assets/icon_alert-triangle.svg';

import {
  container,
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
} from './style';

const DepositMdt = ({depositAmount, address}) => {
  const theme = useTheme();

  const copyToClipboard = () => {
    Clipboard.setString(address);
  };

  return (
    <View style={container(theme)}>
      <View style={[rowContainer, alert]}>
        <AlertIcon
          fill={theme.colors.textOnError.normal}
          stroke={theme.colors.textOnError.normal}
        />
        <AppText variant="subTitle3" style={notEnought(theme)}>
          You don’t have enough MDT
        </AppText>
      </View>
      <AppText variant="body2" style={[mediumEmphasis(theme), textAlignCenter]}>
        You can stake MDT after transfering{' '}
        <FormattedNumber value={depositAmount} /> MDT to the deposit address
        below.
      </AppText>
      <AppText variant="label" style={[depositAddress, mediumEmphasis(theme)]}>
        MDT Deposit Address
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
          />
          <AppText variant="button" style={copyText(theme)}>
            copy
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DepositMdt;
