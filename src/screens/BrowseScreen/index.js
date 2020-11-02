import React from 'react';
import {ScrollView, View} from 'react-native';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_USER_MEMBERSHIP_API} from '@/api/data';

import membershipLevel from '@/enum/membershipLevel';
import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import MembershipCard from '@/components/MembershipCard';
import UpgradeSection from './UpgradeSection';
import ShortcutSection from './ShortcutSection';
import CashBackSummarySection from './CashBackSummarySection';
import MembershipInfoCard from './MembershipInfoCard';

import {imageStyle, upgradeSection, sectionMargin} from './style';
import {useTheme} from 'emotion-theming';

import AppTag from '@/components/AppTag';
import LockIcon from '@/assets/icon_lock.svg';

const testStyle = {
  padding: 12,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
};

const DemoComponents = () => {
  const theme = useTheme();
  return (
    <>
      <View style={testStyle}>
        <AppTag
          variant="transparent"
          sizeVariant="small"
          colorVariant="primary"
          text="current"
        />
        <AppTag
          variant="transparent"
          sizeVariant="small"
          colorVariant="secondary"
          text="current"
        />
        <AppTag
          variant="transparent"
          sizeVariant="small"
          colorVariant="contrast"
          text="current"
        />
      </View>
      <View style={testStyle}>
        <AppTag
          variant="normal"
          sizeVariant="small"
          colorVariant="primary"
          text="current"
        />
        <AppTag
          variant="normal"
          sizeVariant="small"
          colorVariant="secondary"
          text="current"
        />
        <AppTag
          variant="normal"
          sizeVariant="small"
          colorVariant="contrast"
          text="current"
        />
      </View>
      <View style={testStyle}>
        <AppTag
          variant="transparent"
          sizeVariant="normal"
          colorVariant="primary"
          text="Tag Text"
          svgIcon={LockIcon}
        />
        <AppTag
          variant="transparent"
          sizeVariant="normal"
          colorVariant="secondary"
          text="Tag Text"
          svgIcon={LockIcon}
        />
        <AppTag
          variant="transparent"
          sizeVariant="normal"
          colorVariant="contrast"
          text="Tag Text"
          svgIcon={LockIcon}
        />
      </View>
      <View style={testStyle}>
        <AppTag
          variant="normal"
          sizeVariant="normal"
          colorVariant="primary"
          text="Tag Text"
          svgIcon={LockIcon}
        />
        <AppTag
          variant="normal"
          sizeVariant="normal"
          colorVariant="secondary"
          text="Tag Text"
          svgIcon={LockIcon}
        />
        <AppTag
          variant="normal"
          sizeVariant="normal"
          colorVariant="contrast"
          text="Tag Text"
          svgIcon={LockIcon}
        />
      </View>
      <View
        style={{
          ...testStyle,
          backgroundColor: theme.colors.secondary.normal,
        }}>
        <AppTag
          variant="transparent"
          sizeVariant="small"
          colorVariant="onBackground"
          text="current"
        />
        <AppTag
          variant="normal"
          sizeVariant="small"
          colorVariant="onBackground"
          text="current"
        />
      </View>
      <View
        style={{
          ...testStyle,
          backgroundColor: theme.colors.secondary.normal,
        }}>
        <AppTag
          variant="transparent"
          sizeVariant="normal"
          colorVariant="onBackground"
          text="Tag Text"
          svgIcon={LockIcon}
        />
        <AppTag
          variant="normal"
          sizeVariant="normal"
          colorVariant="onBackground"
          text="Tag Text"
          svgIcon={LockIcon}
        />
      </View>
    </>
  );
};

const BrowseScreen = ({navigation}) => {
  const theme = useTheme();
  const {data} = useQueryWithAuth(GET_USER_MEMBERSHIP_API, {
    fetchPolicy: 'network-only',
  });

  const levelGradientList = [
    {
      level: membershipLevel.NEWBIE,
      gradient: theme.colors.membership.newbie.gradient,
    },
    {
      level: membershipLevel.STARTER,
      gradient: theme.colors.membership.starter.gradient,
    },
    {
      level: membershipLevel.EXTRA,
      gradient: theme.colors.membership.extra.gradient,
    },
    {
      level: membershipLevel.ELITE,
      gradient: theme.colors.membership.elite.gradient,
    },
    {
      level: membershipLevel.INFINITE,
      gradient: theme.colors.membership.infinite.gradient,
    },
    {
      level: membershipLevel.INFINITE_PRIVILEGE,
      gradient: theme.colors.membership.infinite_privilege.gradient,
    },
  ];

  const userLevel = data?.userProfile?.membership?.level || 0;
  const userNextLevel = userLevel + 1;

  // TODO: do not linear gradient the whole scroll view
  // TODO: add card scaled shadow
  return (
    <LinearGradientBackground
      colors={
        levelGradientList.find(
          (levelGradient) => userLevel === levelGradient.level,
        )?.gradient
      }>
      <AccountBar navigation={navigation} showCoins />
      <ScrollView>
        <MembershipCard userLevel={userLevel} style={imageStyle} />
        <UpgradeSection
          userNextLevel={userNextLevel}
          navigation={navigation}
          style={[upgradeSection, sectionMargin]}
        />
        <DemoComponents />
        <ShortcutSection navigation={navigation} style={sectionMargin} />
        <CashBackSummarySection navigation={navigation} style={sectionMargin} />
        <MembershipInfoCard userLevel={userLevel} style={sectionMargin} />
      </ScrollView>
    </LinearGradientBackground>
  );
};

export default BrowseScreen;
