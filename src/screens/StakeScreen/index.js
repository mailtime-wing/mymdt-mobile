import React from 'react';
import {ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import TabSection from '@/components/TabSection';
import membershipLevel from '@/enum/membershipLevel';

import StakeSection from './StakeSection';

const tabList = [
  {
    name: <FormattedMessage id="membership_level_3" />,
  },
  {
    name: <FormattedMessage id="membership_level_4" />,
  },
  {
    name: <FormattedMessage id="membership_level_5" />,
  },
];

const RenderTabContent = ({index}) => {
  const theme = useTheme();
  switch (index) {
    case 0:
      return (
        <StakeSection
          level={membershipLevel.ELITE}
          backgroundGradientColors={theme.colors.linearGradientBackground.elite}
        />
      );
    case 1:
      return (
        <StakeSection
          level={membershipLevel.INFINITE}
          backgroundGradientColors={
            theme.colors.linearGradientBackground.infinite
          }
        />
      );
    case 2:
      return (
        <StakeSection
          level={membershipLevel.INFINITE_PRIVILEGE}
          backgroundGradientColors={
            theme.colors.linearGradientBackground.infinite_privilege
          }
        />
      );
    default:
      return null;
  }
};

const StakeScreen = () => {
  const theme = useTheme();

  return (
    <ScrollView>
      <TabSection
        tabList={tabList}
        RenderTabContent={RenderTabContent}
        activeTextColor={theme.colors.primary.normal}
        activeTabColor={theme.colors.primary.normal}
      />
    </ScrollView>
  );
};

export default StakeScreen;
