import React from 'react';
import {FormattedMessage} from 'react-intl';

import SectionList from '@/components/SectionList';
import SectionListOption from '@/components/SectionList/SectionListOption';
import ModalContaienr from '@/components/ModalContainer';
import {
  AccountInfoContainer,
  AccountImage,
  AccountName,
  AccountLevelContainer,
  AccountLevel,
  AccountCreditContainer,
  AccountCredit,
  RemainMDT,
} from './style';

const MenuScreen = props => {
  return (
    <ModalContaienr>
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

      <SectionListOption
        size={30}
        itemKey="brands_preference"
        itemName={<FormattedMessage id="brands_preference" />}
        {...props}
      />

      <SectionList
        listTitle={<FormattedMessage id="account" />}
        listItem={[
          {key: 'profile', value: <FormattedMessage id="profile" />},
          {key: 'emails_binding', value: <FormattedMessage id="emails_binding" />},
          {
            key: 'my_referral_code',
            value: <FormattedMessage id="my_referral_code" />,
          },
          {
            key: 'enter_invite_code',
            value: <FormattedMessage id="enter_invite_code" />,
          },
          {key: 'sign_out', value: <FormattedMessage id="sign_out" />},
        ]}
        {...props}
      />

      <SectionList
        listTitle={<FormattedMessage id="application" />}
        listItem={[
          {key: 'settings', value: <FormattedMessage id="settings" />},
          {
            key: 'faq_and_support',
            value: <FormattedMessage id="faq_and_support" />,
          },
          {
            key: 'terms_of_service',
            value: <FormattedMessage id="terms_of_service" />,
          },
          {
            key: 'privacy_policy',
            value: <FormattedMessage id="privacy_policy" />,
          },
          {key: 'about_us', value: <FormattedMessage id="about_us" />},
        ]}
        {...props}
      />
    </ModalContaienr>
  );
};

export default MenuScreen;
