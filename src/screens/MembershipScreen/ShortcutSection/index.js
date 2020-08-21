import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTheme} from 'emotion-theming';

import {sectionContainer, name, shortcut} from './style';
import HeartIcon from '@/assets/heart_circle_fill.svg';
import WalletIcon from '@/assets/wallet_circle_fill.svg';
import ReferralIcon from '@/assets/referral_circle_fill.svg';

import AppText from '@/components/AppText2';

const shortcutList = [
  {name: 'Special Offers', icon: <HeartIcon />},
  {name: 'Cashback type', icon: <WalletIcon />},
  {name: 'Referral', icon: <ReferralIcon />},
];

const ShortcutSection = () => {
  const theme = useTheme();
  return (
    <View style={sectionContainer(theme)}>
      {shortcutList.map(sc => (
        <TouchableOpacity key={sc.name} style={shortcut}>
          {sc.icon}
          <AppText variant="caption" style={name(theme)}>
            {sc.name}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default ShortcutSection;
