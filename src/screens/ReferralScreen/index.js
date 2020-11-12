import React from 'react';
import {ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import InviteFriendsSection from './InviteFriendsSection';
import RewardsSection from './RewardsSection';
import ScreenContainer from '@/components/ScreenContainer';
import AppText from '@/components/AppText2';
import TabSection from '@/components/TabSection';

import {titleStyle} from './style';

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
    <ScreenContainer>
      <ScrollView>
        <AppText variant="pageTitle" style={titleStyle(theme)}>
          <FormattedMessage id="referral" defaultMessage="Referral" />
        </AppText>
        <TabSection
          tabList={tabList}
          RenderTabContent={RenderTabContent}
          activeTextColor={theme.colors.secondary.dark}
          activeTabColor={theme.colors.secondary.normal}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export default ReferralScreen;
