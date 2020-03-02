import React from 'react';
import styled from '@emotion/native';
import {FormattedMessage} from 'react-intl';

import SectionList from '@/components/SectionList';
import SectionListOption from '@/components/SectionList/SectionListOption';

const Container = styled.View`
  margin-top: 15px;
  padding-top: 75px;
  border-radius: 24px;
  background-color: ${props => props.theme.colors.white};
`;

const ScrollContainer = styled.ScrollView`
  background-color: ${props => props.theme.colors.white};
`;

const AccountInfoContainer = styled.View`
  align-items: center;
  margin-bottom: 12px;
`;

const AccountImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  margin-bottom: 15px;
`;

const AccountName = styled.Text`
  font-size: 21px;
  margin-bottom: 8px;
`;

const AccountLevelContainer = styled.View`
  padding: 4px 12px;
  background-color: ${props => props.theme.colors.gold};
  border-radius: 32px;
  margin-bottom: 34px;
`;

const AccountLevel = styled.Text`
  font-size: 12px;
  font-weight: bold;
`;

const AccountCreditContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 30px;
`;

const AccountCredit = styled.Text`
  flex: 1;
  font-size: 16px;
`;

const RemainMDT = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const MenuScreen = props => {
  return (
    <Container>
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
      </ScrollContainer>
    </Container>
  );
};

export default MenuScreen;
