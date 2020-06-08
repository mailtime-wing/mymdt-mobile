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
import {AuthContext, REWARD_POINT, MDT} from '@/context/auth';

import ThemeButton from '@/components/ThemeButton';

const cashbackTypeList = [
  {
    level: 'Recommended',
    title: 'Return in RewardPoint',
    detail:
      'The convert rate is more stable and you can redeem gift cards in app.',
    type: REWARD_POINT,
  },
  {
    level: 'Advanced',
    title: 'Return in Measurable Data Token',
    detail:
      'MDT is a cryptocurrency that its value may vary from time to time.',
    type: MDT,
  },
];

const CashBackType = ({cashback, handleChoosePress}) => (
  <BoxContainer>
    <BoxLevel>{cashback.level}</BoxLevel>
    <BoxTitle>{cashback.title}</BoxTitle>
    <BoxDetail>{cashback.detail}</BoxDetail>
    <ThemeButton
      small
      width="auto"
      onPress={() => handleChoosePress(cashback.type)}>
      <FormattedMessage id="choose_this" defaultMessage="Choose This" />
    </ThemeButton>
  </BoxContainer>
);

const ChooseCashBackTypeScreen = ({navigation}) => {
  const {updateCashBackType} = useContext(AuthContext);

  const handleChoosePress = async cashbackType => {
    try {
      await updateCashBackType(cashbackType);
    } catch (e) {
      console.warn(`error on saving cashback Type ${cashbackType}`, e);
    }
    navigation.navigate('welcome');
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
