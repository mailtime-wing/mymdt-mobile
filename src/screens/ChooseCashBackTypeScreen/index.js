import React, {useContext} from 'react';
import {View, ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {css} from '@emotion/native';

import {AuthContext} from '@/context/auth';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import ScreenContainer from '@/components/ScreenContainer';
import useSetupFlow from '@/hooks/useSetupFlow';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {UPDATE_USER_CASHBACK_CURRENCY_CODE_API} from '@/api/data';
import {REWARD_DOLLAR, ME} from '@/constants/currency';

import {
  container,
  scrollContainer,
  boxContainer,
  detail,
  boxLevel,
  boxTitle,
  boxDetail,
  titleStyle,
} from './style';

const cashbackTypeList = [
  {
    level: 'Recommended',
    title: 'Return in RewardPoint',
    detail:
      'The convert rate is more stable and you can redeem gift cards in app.',
    type: REWARD_DOLLAR,
  },
  {
    level: 'Advanced',
    title: 'Return in Measurable Data Token',
    detail:
      'MDT is a cryptocurrency that its value may vary from time to time.',
    type: ME,
  },
];

const buttonStyle = {
  width: 'auto',
  alignSelf: 'center',
};

const CashBackType = ({cashback, handleChoosePress, theme}) => (
  <View
    style={[
      css`
        ${theme.colors.elevatedBackgroundFlat}
      `,
      boxContainer,
    ]}>
    <AppText variant="label" style={boxLevel(theme)}>
      {cashback.level}
    </AppText>
    <AppText variant="heading3" style={boxTitle(theme)}>
      {cashback.title}
    </AppText>
    <AppText variant="body1" style={boxDetail(theme)}>
      {cashback.detail}
    </AppText>
    <AppButton
      variant="filled"
      sizeVariant="normal"
      colorVariant="secondary"
      text={
        <FormattedMessage
          id="button.choose_this"
          defaultMessage="Choose This"
        />
      }
      style={buttonStyle}
      onPress={() => handleChoosePress(cashback.type)}
    />
  </View>
);

const ChooseCashBackTypeScreen = () => {
  const theme = useTheme();
  const {navigateByFlow} = useSetupFlow();
  const [updateUserCashbackCurrencyCodeRequest] = useMutationWithAuth(
    UPDATE_USER_CASHBACK_CURRENCY_CODE_API,
  );
  const {updateCashBackType} = useContext(AuthContext);

  const handleChoosePress = async (cashbackType) => {
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
          <FormattedMessage
            id="choose_cash_back_type"
            defaultMessage="Choose your cashback type"
          />
        </AppText>
        <AppText variant="body1" style={detail(theme)}>
          <FormattedMessage
            id="change_cashback_perference_later"
            defaultMessage="RewardMe provides 2 types of cashback. You can change the perference afterwards."
          />
        </AppText>
        {cashbackTypeList.map((cbt) => (
          <CashBackType
            key={cbt.type}
            cashback={cbt}
            handleChoosePress={handleChoosePress}
            theme={theme}
          />
        ))}
      </ScreenContainer>
    </ScrollView>
  );
};

export default ChooseCashBackTypeScreen;
