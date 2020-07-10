import React,{useLayoutEffect} from 'react';
import {FormattedMessage} from 'react-intl';

import ListOption from '@/components/ListOption';
import {
  AccountInfoContainer,
  AccountImage,
  AccountName,
  AccountLevelContainer,
  AccountLevel,
  AccountCreditContainer,
  AccountCredit,
  RemainMDT,
  ScrollContainer,
  ListContainer,
} from './style';

import BackButton from '@/components/BackButton';

const MenuScreen = ({navigation}) => {
  // TODO: will remove when refactor the profileStack
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton />,
    });
  }, [navigation]);

  const menuListOptions = [
    {
      label: <FormattedMessage id="edit_profile" />,
      onPress: () => navigation.navigate('edit_profile'),
    },
    {
      label: <FormattedMessage id="membership" />,
      onPress: () => navigation.navigate('membership'),
    },
    {
      label: <FormattedMessage id="my_referral_code" />,
      onPress: () => navigation.navigate('my_referral_code'),
    },
    {
      label: <FormattedMessage id="offers_preference" />,
      onPress: () => navigation.navigate('offers_preference'),
    },
    {
      label: <FormattedMessage id="emails_binding" />,
      onPress: () => navigation.navigate('emails_binding'),
    },
    {
      label: <FormattedMessage id="account_security" />,
      onPress: () => navigation.navigate('account_security'),
    },
    {
      label: <FormattedMessage id="enter_invite_code" />,
      onPress: () => navigation.navigate('enter_invite_code'),
    },
    {
      label: <FormattedMessage id="sign_out" />,
      onPress: () => navigation.navigate('sign_out'),
    },
  ];

  const menuListOptions2 = [
    {
      label: <FormattedMessage id="settings" />,
      onPress: () => navigation.navigate('settings'),
    },
    {
      label: <FormattedMessage id="faq_and_support" />,
      onPress: () => navigation.navigate('faq_and_support'),
    },
    {
      label: <FormattedMessage id="terms_of_service" />,
      onPress: () => navigation.navigate('terms_of_service'),
    },
    {
      label: <FormattedMessage id="privacy_policy" />,
      onPress: () => navigation.navigate('privacy_policy'),
    },
    {
      label: <FormattedMessage id="about_us" />,
      onPress: () => navigation.navigate('about_us'),
    },
  ];
  // TODO: just to fix react warning, ui focus on other commit
  return (
    <ScrollContainer>
      <AccountInfoContainer>
        <AccountImage source={require('@/assets/zt-mask.jpg')} />
        <AccountName>Adam</AccountName>
        <AccountLevelContainer>
          <AccountLevel>
            <FormattedMessage id="gold_member" />
          </AccountLevel>
        </AccountLevelContainer>
        <AccountCreditContainer>
          <AccountCredit>
            <FormattedMessage id="total_balance" />
          </AccountCredit>
          <RemainMDT>6,543 MDT</RemainMDT>
        </AccountCreditContainer>
      </AccountInfoContainer>

      <ListContainer>
        {menuListOptions.map((option, index) => (
          <ListOption
            key={index}
            label={option.label}
            onPress={option.onPress}
          />
        ))}
      </ListContainer>
      <ListContainer>
        {menuListOptions2.map((option, index) => (
          <ListOption
            key={index}
            label={option.label}
            onPress={option.onPress}
          />
        ))}
      </ListContainer>
    </ScrollContainer>
  );
};

export default MenuScreen;
