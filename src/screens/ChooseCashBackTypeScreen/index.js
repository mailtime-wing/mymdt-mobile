import React, {useContext} from 'react';
import {
  Container,
  ScrollContainer,
  Title,
  Detail,
  BoxContainer,
  BoxLevel,
  BoxTitle,
  BoxDetail,
} from './style';
import {FormattedMessage} from 'react-intl';
import {
  AuthContext,
  MEASURABLE_REWARD_POINT,
  MEASURABLE_DATA_TOKEN,
} from '@/context/auth';
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_USER_CASHBACK_CURRENCY_CODE_API} from '@/api/data';

import ThemeButton from '@/components/ThemeButton';

const cashbackTypeList = [
  {
    level: 'Recommended',
    title: 'Return in RewardPoint',
    detail:
      'The convert rate is more stable and you can redeem gift cards in app.',
    type: MEASURABLE_REWARD_POINT,
  },
  {
    level: 'Advanced',
    title: 'Return in Measurable Data Token',
    detail:
      'MDT is a cryptocurrency that its value may vary from time to time.',
    type: MEASURABLE_DATA_TOKEN,
  },
];

const CashBackType = ({cashback, handleChoosePress}) => (
  <BoxContainer>
    <BoxLevel>{cashback.level}</BoxLevel>
    <BoxTitle>{cashback.title}</BoxTitle>
    <BoxDetail>{cashback.detail}</BoxDetail>
    <ThemeButton
      medium
      width="auto"
      onPress={() => handleChoosePress(cashback.type)}>
      <FormattedMessage id="choose_this" defaultMessage="Choose This" />
    </ThemeButton>
  </BoxContainer>
);

const ChooseCashBackTypeScreen = ({route, navigation}) => {
  const [updateUserCashbackCurrencyCodeRequest] = useMutation(
    UPDATE_USER_CASHBACK_CURRENCY_CODE_API,
  );
  const {authToken, updateCashBackType} = useContext(AuthContext);

  const handleChoosePress = async cashbackType => {
    try {
      await updateUserCashbackCurrencyCodeRequest({
        variables: {
          code: cashbackType,
        },
        context: {
          headers: {
            authorization: authToken ? `Bearer ${authToken}` : '',
          },
        },
      });
      updateCashBackType(cashbackType);
    } catch (e) {
      console.warn(`error on saving cashback Type ${cashbackType}`, e);
    }
    navigation.navigate(route.params.next);
  };

  return (
    <ScrollContainer>
      <Container>
        <Title>
          <FormattedMessage
            id="choose_cash_back_type"
            defaultMessage="Choose your cashback type"
          />
        </Title>
        <Detail>
          <FormattedMessage
            id="change_cashback_perference_later"
            defaultMessage="RewardMe provides 2 types of cashback. You can change the perference afterwards."
          />
        </Detail>
        {cashbackTypeList.map(cbt => (
          <CashBackType cashback={cbt} handleChoosePress={handleChoosePress} />
        ))}
      </Container>
    </ScrollContainer>
  );
};

export default ChooseCashBackTypeScreen;
