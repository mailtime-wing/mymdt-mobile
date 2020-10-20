import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';

import {
  sectionContainer,
  actionsContainer,
  nameStyle,
  shortcut,
  quickActions,
} from './style';
import AwardIcon from '@/assets/icon_award.svg';
import CreditCardIcon from '@/assets/icon_credit-card.svg';
import DollarSignIcon from '@/assets/dollar_sign_icon';
import BagIcon from '@/assets/icon_shopping-bag';
import ReferralIcon from '@/assets/referral_icon.svg';
import MailIcon from '@/assets/icon_mail.svg';

import AppText from '@/components/AppText2';
import AppIcon from '@/components/AppIcon';

const ShortcutSection = ({navigation, style}) => {
  const theme = useTheme();

  // TODO: navigate to correct screen when confirm
  const shortcutList = [
    {
      name: 'Privileges',
      icon: AwardIcon,
      action: () => navigation.navigate('settings'),
    },
    {
      name: 'Add Email',
      icon: MailIcon,
      action: () => navigation.navigate('settings'),
    },
    {
      name: 'Add Card',
      icon: CreditCardIcon,
      action: () => navigation.navigate('settings'),
    },
    {
      name: 'Referral',
      icon: ReferralIcon,
      action: () => navigation.navigate('settings'),
    },
    {
      name: 'Selected Merchants',
      icon: BagIcon,
      action: () => navigation.navigate('settings'),
    },
    {
      name: 'Cashback type',
      icon: DollarSignIcon,
      action: () => navigation.navigate('settings'),
    },
  ];

  return (
    <View
      style={[
        css`
          ${theme.colors.elevatedBackground1}
        `,
        sectionContainer,
        style,
      ]}>
      <AppText variant="heading6" style={quickActions(theme)}>
        Quick Actions
      </AppText>
      <View style={actionsContainer}>
        {shortcutList.map(({name, icon, action}) => (
          <TouchableOpacity key={name} style={shortcut} onPress={action}>
            <AppIcon
              color={theme.colors.secondary.normal}
              sizeVariant="normal"
              svgIcon={icon}
            />
            <AppText variant="caption" style={nameStyle(theme)}>
              {name}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default ShortcutSection;
