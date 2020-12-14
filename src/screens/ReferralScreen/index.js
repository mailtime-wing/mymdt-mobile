import React from 'react';
import {ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import InviteFriendsSection from './InviteFriendsSection';
import RewardsSection from './RewardsSection';
import HeaderTitle from '@/components/HeaderTitle';
import TabSection from '@/components/TabSection';

const tabList = [
  {
    name: 'INVITE FRIENDS',
  },
  {
    name: 'REWARDS',
  },
];

const RenderTabContent = ({index}) => {
  switch (index) {
    case 0:
      return <InviteFriendsSection />;
    case 1:
      return <RewardsSection />;
    default:
      return null;
  }
};

const ReferralScreen = () => {
  const theme = useTheme();

  return (
    <ScrollView>
      <HeaderTitle>
        <FormattedMessage id="referral" defaultMessage="Referral" />
      </HeaderTitle>
      <TabSection
        tabList={tabList}
        RenderTabContent={RenderTabContent}
        activeTextColor={theme.colors.secondary.dark}
        activeTabColor={theme.colors.secondary.normal}
      />
    </ScrollView>
  );
};

export default ReferralScreen;
