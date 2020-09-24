import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';

import {
  sectionContainer,
  header,
  privilege,
  privilegeDetail,
  privilegeDetailContainer,
  highlight,
  claimButton,
} from './style';
import HeartIcon from '@/assets/heart_icon.svg';
import DollarSignIcon from '@/assets/dollar_sign_icon.svg';
import GiftIcon from '@/assets/gift_icon.svg';

import AppText from '@/components/AppText2';
import AppIcon from '@/components/AppIcon';
import AppButton from '@/components/AppButton';
import {FormattedMessage, FormattedNumber} from 'react-intl';

const PrivilegesSection = () => {
  const theme = useTheme();
  const privilegeList = [
    {
      name: (
        <FormattedMessage
          id="special_offers_from_brands"
          values={{
            number_of_brands: (
              <AppText variant="body2" style={highlight(theme)}>
                3
              </AppText>
            ),
          }}
        />
      ),
      icon: HeartIcon,
    },
    {
      name: (
        <FormattedMessage
          id="additional_percentage_cashback"
          values={{
            percentage: (
              <AppText variant="body2" style={highlight(theme)}>
                <FormattedNumber value={0.02} style="percent" />
              </AppText>
            ),
          }}
        />
      ),
      icon: DollarSignIcon,
    },
    {name: 'Netflix one-month subscription', icon: GiftIcon, claim: true},
    {name: 'Birthday gift', icon: GiftIcon, claim: true},
  ];
  return (
    <View
      style={[
        css`
          ${theme.colors.elevatedBackground1}
        `,
        sectionContainer,
      ]}>
      <AppText variant="heading5" style={header(theme)}>
        <FormattedMessage id="privileges" />
      </AppText>
      {privilegeList.map(({name, icon, claim}, i) => (
        <View key={i} style={privilege}>
          <AppIcon
            color={theme.colors.background1}
            backgroundColor={theme.colors.secondary.normal}
            sizeVariant="small"
            svgIcon={icon}
          />
          <View style={privilegeDetailContainer}>
            <AppText variant="body2" style={privilegeDetail(theme)}>
              {name}
            </AppText>
          </View>
          {claim && (
            <AppButton
              variant="filled"
              sizeVariant="compact"
              colorVariant="secondary"
              text={<FormattedMessage id="button.claim" />}
              style={claimButton}
            />
          )}
        </View>
      ))}
    </View>
  );
};
export default PrivilegesSection;
