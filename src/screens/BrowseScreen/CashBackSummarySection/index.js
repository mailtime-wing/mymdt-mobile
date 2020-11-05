import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';

import {
  rewardMeContainer,
  summaryHeader,
  earned,
  amount,
  rewardMe,
  upperSection,
  summaryContainer,
  lowerSection,
  arrow,
  brand as brandName,
  brandPercentage,
  imageContainer,
  brandDetail as brandDetailContainer,
  selectedMerchant,
  rowContainer,
  button,
} from './style';

import ArrowIcon from '@/assets/list_arrow.svg';
import ShoppingBagAddIcon from '@/assets/icon_shopping-bag-add.svg';

import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import BrandIcon from '@/components/BrandIcon';
import {FormattedMessage} from 'react-intl';

const CashBackItem = ({icon, brand}) => {
  const theme = useTheme();
  // TODO: create <AppTag /> component for %
  return (
    <View style={rowContainer}>
      <View style={imageContainer}>
        <BrandIcon sizeVariant="large" ImgSrc={icon} />
      </View>
      <View style={brandDetailContainer(theme)}>
        <View style={rowContainer}>
          <AppText variant="heading5" style={brandName(theme)}>
            {brand}
          </AppText>
          <AppText variant="heading6" style={brandPercentage(theme)}>
            0.5% cashback
          </AppText>
        </View>

        <AppText variant="caption" style={earned(theme)}>
          <FormattedMessage
            id="earned_in_past_7_days"
            values={{
              amount: (
                <AppText variant="caption" style={amount(theme)}>
                  USD 5
                </AppText>
              ),
            }}
          />
        </AppText>
        <AppText variant="caption" style={earned(theme)}>
          <FormattedMessage
            id="earned_in_total"
            values={{
              amount: (
                <AppText variant="caption" style={amount(theme)}>
                  USD 3,240
                </AppText>
              ),
            }}
          />
        </AppText>
      </View>
    </View>
  );
};

const CashBackSummarySection = ({onPress, style}) => {
  const theme = useTheme();

  return (
    <View style={style}>
      <TouchableOpacity style={upperSection(theme)} onPress={onPress}>
        <View style={rewardMeContainer}>
          <Image source={require('@/assets/rewardme.png')} style={rewardMe} />
        </View>
        <View style={summaryContainer}>
          <AppText variant="heading4" style={summaryHeader(theme)}>
            Cash Back Summary
          </AppText>
          <AppText variant="caption" style={earned(theme)}>
            <FormattedMessage
              id="earned_in_past_7_days"
              values={{
                amount: (
                  <AppText variant="caption" style={amount(theme)}>
                    USD 10
                  </AppText>
                ),
              }}
            />
          </AppText>
          <AppText variant="caption" style={earned(theme)}>
            <FormattedMessage
              id="earned_in_total"
              values={{
                amount: (
                  <AppText variant="caption" style={amount(theme)}>
                    USD 6,480
                  </AppText>
                ),
              }}
            />
          </AppText>
        </View>
        <ArrowIcon
          stroke={theme.colors.borderColor}
          strokeWidth={2}
          style={arrow}
        />
      </TouchableOpacity>
      <View
        style={[
          lowerSection,
          css`
            ${theme.colors.elevatedBackground1}
          `,
        ]}>
        <AppText variant="subTitle3" style={selectedMerchant(theme)}>
          Cash Back from Selected Merchants
        </AppText>
        <CashBackItem icon={require('@/assets/netflix.png')} brand="Amazon" />
        <CashBackItem
          icon={require('@/assets/netflix.png')}
          brand="Rakuten JP"
        />
        <AppButton
          variant="filled"
          sizeVariant="normal"
          colorVariant="secondary"
          text="Add merchant"
          style={button}
          svgIcon={ShoppingBagAddIcon}
        />
      </View>
    </View>
  );
};
export default CashBackSummarySection;
