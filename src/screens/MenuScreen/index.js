import React from 'react';
import {FormattedMessage} from 'react-intl';

import SectionList from '@/components/SectionList';
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
} from './style';

const MenuScreen = props => {
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

      <SectionList
        listTitle=""
        listItem={[
          {key: 'edit_profile', value: <FormattedMessage id="edit_profile" />},
          {key: 'membership', value: <FormattedMessage id="membership" />},
          {
            key: 'my_referral_code',
            value: <FormattedMessage id="my_referral_code" />,
          },
          {
            key: 'offers_preference',
            value: <FormattedMessage id="offers_preference" />,
          },
          {
            key: 'emails_binding',
            value: <FormattedMessage id="emails_binding" />,
          },
          {
            key: 'account_security',
            value: <FormattedMessage id="account_security" />,
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
    </ScrollContainer>
  );
};

export default MenuScreen;
