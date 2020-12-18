import React, {useContext} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';
import SafeAreaView from 'react-native-safe-area-view';

import {AuthContext} from '@/context/auth';

import AppText from '@/components/AppText2';
import HeaderTitle from '@/components/HeaderTitle';
import AppTag from '@/components/AppTag';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {UPDATE_USER_CASHBACK_CURRENCY_CODE_API} from '@/api/data';
import {REWARD_DOLLAR, ME} from '@/constants/currency';

import {
  container,
  innerContainer,
  separator,
  button,
  boxContainer,
  detail,
  image,
  boxLevel,
  boxTitle,
  boxDetail,
  titleStyle,
} from './style';

const CashbackAppTag = (props) => {
  const theme = useTheme();
  return (
    <AppTag
      variant="transparent"
      sizeVariant="small"
      style={boxLevel(theme)}
      {...props}
    />
  );
};

const CashBackType = ({theme, source, tag, title, description, onPress}) => (
  <TouchableOpacity style={button} onPress={onPress}>
    <View
      style={[
        css`
          ${theme.colors.elevatedDarkerCardFlat}
        `,
        boxContainer,
      ]}>
      <Image style={image} source={source} />
      {tag}
      <AppText variant="heading3" style={boxTitle(theme)}>
        {title}
      </AppText>
      <AppText variant="body1" style={boxDetail(theme)}>
        {description}
      </AppText>
    </View>
  </TouchableOpacity>
);

const ChooseCashBackTypeSetting = ({onChoose}) => {
  const theme = useTheme();
  const [updateUserCashbackCurrencyCodeRequest] = useMutationWithAuth(
    UPDATE_USER_CASHBACK_CURRENCY_CODE_API,
  );
  const {updateCashBackType} = useContext(AuthContext);

  const handlePress = async (cashbackType) => {
    try {
      await updateUserCashbackCurrencyCodeRequest({
        variables: {
          code: cashbackType,
        },
      });
      updateCashBackType(cashbackType);
      onChoose();
    } catch (e) {
      console.warn(`error on saving cashback Type ${cashbackType}`, e);
    }
  };

  return (
    <SafeAreaView
      forceInset={{top: 'always', bottom: 'always'}}
      style={container(theme)}>
      <HeaderTitle variant="pageTitle" style={titleStyle(theme)}>
        <FormattedMessage id="cashback_type" />
      </HeaderTitle>
      <AppText variant="body1" style={detail(theme)}>
        <FormattedMessage id="choose_which_currency_for_cashback" />
      </AppText>
      <View style={innerContainer(theme)}>
        <CashBackType
          theme={theme}
          source={require('@/assets/rewardpoint-coins.png')}
          tag={
            <CashbackAppTag
              text={<FormattedMessage id="recommended" />}
              colorVariant="secondary"
            />
          }
          title={<FormattedMessage id="currencyDisplayName.RD" />}
          description={<FormattedMessage id="redeemableForGiftCards" />}
          onPress={() => handlePress(REWARD_DOLLAR)}
        />
        <View style={separator} />
        <CashBackType
          theme={theme}
          source={require('@/assets/mdt-coins.png')}
          tag={<CashbackAppTag text={'Advanced'} colorVariant="primary" />}
          title={<FormattedMessage id="cryptocurrency" />}
          description={<FormattedMessage id="cashbackWillBePaidIn" />}
          onPress={() => handlePress(ME)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChooseCashBackTypeSetting;
