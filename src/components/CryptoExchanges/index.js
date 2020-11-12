import React from 'react';
import {View, TouchableOpacity, Linking} from 'react-native';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import AppAvator from '@/components/AppAvator';
import AppIcon from '@/components/AppIcon';

import ExternalLinkIcon from '@/assets/icon_external-link.svg';

import {
  container,
  header,
  exchangesName,
  referralLink,
  referral,
  textAlignCenter,
  rowContainer,
  exchangesImage,
} from './style';

const ReferralLink = ({url}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={() => Linking.openURL(url)} style={referral}>
      <AppIcon
        svgIcon={ExternalLinkIcon}
        sizeVariant="small"
        color={theme.colors.textOnBackground.disabled}
      />
      <AppText variant="caption" style={referralLink(theme)}>
        Referral link
      </AppText>
    </TouchableOpacity>
  );
};

const CryptoExchanges = () => {
  const theme = useTheme();
  return (
    <View style={container(theme)}>
      <AppText variant="body2" style={[header(theme), textAlignCenter]}>
        MDT is available in these crypto exchanges
      </AppText>
      <View style={rowContainer}>
        <AppAvator
          variant="default"
          sizeVariant="small"
          imageSrc={require('@/assets/icon_binance.png')}
          style={exchangesImage}
        />
        <AppText variant="body1" style={exchangesName(theme)}>
          Binance
        </AppText>
        <ReferralLink url="https://accounts.binance.com/en/register?ref=VXR61SQI" />
      </View>
      <View style={rowContainer}>
        <AppAvator
          variant="default"
          sizeVariant="small"
          imageSrc={require('@/assets/icon_okex.png')}
          style={exchangesImage}
        />
        <AppText variant="body1" style={exchangesName(theme)}>
          OKEx
        </AppText>
        <ReferralLink url="https://www.okex.com/join/1/1838164" />
      </View>
      <View style={rowContainer}>
        <AppAvator
          variant="default"
          sizeVariant="small"
          imageSrc={require('@/assets/icon_digifinex.png')}
          style={exchangesImage}
        />
        <AppText variant="body1" style={exchangesName(theme)}>
          Digifinex
        </AppText>
        <ReferralLink url="https://www.digifinex.com/en-ww/from/lpKlJk" />
      </View>
    </View>
  );
};

export default CryptoExchanges;
