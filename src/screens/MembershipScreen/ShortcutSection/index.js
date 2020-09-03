import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';

import {sectionContainer, nameStyle, shortcut} from './style';
import HeartIcon from '@/assets/heart_icon.svg';
import WalletIcon from '@/assets/wallet_icon.svg';
import ReferralIcon from '@/assets/referral_icon.svg';

import AppText from '@/components/AppText2';
import AppIcon from '@/components/AppIcon';

const shortcutList = [
  {name: 'Special Offers', icon: HeartIcon},
  {name: 'Cashback type', icon: WalletIcon},
  {name: 'Referral', icon: ReferralIcon},
];

const ShortcutSection = () => {
  const theme = useTheme();
  return (
    <View
      style={[
        css`
          ${theme.colors.elevatedBackground1}
        `,
        sectionContainer,
      ]}>
      {shortcutList.map(({name, icon}) => (
        <TouchableOpacity key={name} style={shortcut}>
          <AppIcon
            color={theme.colors.background1}
            backgroundColor={theme.colors.secondary.normal}
            sizeVariant="small"
            svgIcon={icon}
          />
          <AppText variant="caption" style={nameStyle(theme)}>
            {name}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default ShortcutSection;
