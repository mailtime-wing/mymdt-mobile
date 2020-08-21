import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';

import {
  sectionContainer,
  header,
  privilege,
  privilegeDetail,
  privilegeDetailContainer,
} from './style';
import HeartIcon from '@/assets/heart_circle_fill.svg';
import MoneyIcon from '@/assets/money_circle_fill.svg';
import GiftIcon from '@/assets/gift_circle_fill.svg';

import AppText from '@/components/AppText2';
import ThemeButton from '@/components/ThemeButton';
import {FormattedMessage} from 'react-intl';

const privilegeList = [
  {name: 'Special offers from 3 brands', icon: <HeartIcon />},
  {name: 'Additional 2% cashback', icon: <MoneyIcon />},
  {name: 'Netflix one-month subscription', icon: <GiftIcon />, claim: true},
  {name: 'Birthday gift', icon: <GiftIcon />, claim: true},
];

const PrivilegesSection = () => {
  const theme = useTheme();
  return (
    <View style={sectionContainer(theme)}>
      <AppText variant="heading5" style={header(theme)}>
        <FormattedMessage id="privileges" />
      </AppText>
      {privilegeList.map(p => (
        <View key={p.name} style={privilege}>
          {p.icon}
          <View style={privilegeDetailContainer}>
            <AppText variant="body2" style={privilegeDetail(theme)}>
              {p.name}
            </AppText>
          </View>
          {p.claim && (
            <ThemeButton small>
              <FormattedMessage id="claim" />
            </ThemeButton>
          )}
        </View>
      ))}
    </View>
  );
};
export default PrivilegesSection;
