import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import InviteFriendsSection from './InviteFriendsSection';
import RewardsSection from './RewardsSection';
import ScreenContainer from '@/components/ScreenContainer';
import AppText from '@/components/AppText2';

import {
  titleStyle,
  container,
  tabGroupContainer,
  tabContainer,
  tabNameStyle,
  activeBottomBar,
  contentContainer,
} from './style';

const tabList = ['INVITE FRIENDS', 'REWARDS'];

const RenderTabContent = ({index, ...props}) => {
  switch (index) {
    case 0:
      return <InviteFriendsSection {...props} />;
    case 1:
      return <RewardsSection />;
    default:
      return null;
  }
};

const TabSection = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <View style={tabGroupContainer}>
        {tabList.map((tab, index) => {
          const active = index === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              style={tabContainer(theme)}
              onPress={() => handleTabPress(index)}>
              <AppText
                variant="button"
                style={tabNameStyle(theme, index === activeTab)}>
                {tab}
              </AppText>
              {active && <View style={activeBottomBar(theme)} />}
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={contentContainer}>
        <RenderTabContent index={activeTab} />
      </View>
    </>
  );
};

const ReferralScreen = () => {
  const theme = useTheme();

  return (
    <ScreenContainer>
      <View style={container}>
        <AppText variant="pageTitle" style={titleStyle(theme)}>
          <FormattedMessage id="referral" defaultMessage="Referral" />
        </AppText>
        <TabSection />
      </View>
    </ScreenContainer>
  );
};

export default ReferralScreen;
