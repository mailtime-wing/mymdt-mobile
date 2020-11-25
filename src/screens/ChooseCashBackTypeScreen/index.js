import React, {useContext} from 'react';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {css} from '@emotion/native';

import {AuthContext} from '@/context/auth';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import ScreenContainer from '@/components/ScreenContainer';
import AppTag from '@/components/AppTag';
import useSetupFlow from '@/hooks/useSetupFlow';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {UPDATE_USER_CASHBACK_CURRENCY_CODE_API} from '@/api/data';
import {REWARD_DOLLAR, ME} from '@/constants/currency';

import {
  container,
  scrollContainer,
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
          ${theme.colors.elevatedBackgroundFlat}
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

const ChooseCashBackTypeScreen = () => {
  const theme = useTheme();
  const {navigateByFlow} = useSetupFlow();
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
      navigateByFlow();
    } catch (e) {
      console.warn(`error on saving cashback Type ${cashbackType}`, e);
    }
  };

  return (
    <ScrollView style={scrollContainer(theme)}>
      <ScreenContainer style={container}>
        <AppText variant="pageTitle" style={titleStyle(theme)}>
          <FormattedMessage id="cashback_type" />
        </AppText>
        <AppText variant="body1" style={detail(theme)}>
          <FormattedMessage id="choose_which_currency_for_cashback" />
        </AppText>
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
        <CashBackType
          theme={theme}
          source={require('@/assets/mdt-coins.png')}
          tag={<CashbackAppTag text={'Advanced'} colorVariant="primary" />}
          title={<FormattedMessage id="cryptocurrency" />}
          description={<FormattedMessage id="cashbackWillBePaidIn" />}
          onPress={() => handlePress(ME)}
        />
      </ScreenContainer>
    </ScrollView>
  );
};

export default ChooseCashBackTypeScreen;
