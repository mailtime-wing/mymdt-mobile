import React, {useLayoutEffect} from 'react';
import {View, TouchableOpacity, ScrollView, Image} from 'react-native';
import {FormattedDate, FormattedMessage} from 'react-intl';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_USER_MEMBERSHIP_API} from '@/api/data';
import {useTheme} from 'emotion-theming';

import {
  toolsRowContainer,
  buttons,
  imageStyle,
  bigAccountIcon,
  validDate,
  name,
  rowContainer,
  userRowContainer,
  rightContainer,
  sectionsContainer,
} from './style';
import BellIcon from '@/assets/icon_bell.svg';
import SettingIcon from '@/assets/icon_settings.svg';
import UpgradeSection from './UpgradeSection';
import ShortcutSection from './ShortcutSection';
import PrivilegesSection from './PrivilegesSection';

import LinearGradientBackground from '@/components/LinearGradientBackground';
import ScreenContainer from '@/components/ScreenContainer';
import MembershipLevelChip from '@/components/MembershipLevelChip';
import UserIcon from '@/components/UserIcon';
import AppText from '@/components/AppText2';

const MembershipScreen = ({navigation}) => {
  const theme = useTheme();
  const {data} = useQueryWithAuth(GET_USER_MEMBERSHIP_API, {
    fetchPolicy: 'network-only',
  });

  const userLevel = data?.userProfile?.membership?.level || 0;
  const userNextLevel = userLevel + 1;

  useLayoutEffect(() => {
    const RightSideButtons = () => (
      <View style={toolsRowContainer}>
        <TouchableOpacity
          style={buttons}
          onPress={() => navigation.navigate('notification')}>
          <BellIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={buttons}
          onPress={() => navigation.navigate('settings')}>
          <SettingIcon />
        </TouchableOpacity>
      </View>
    );

    navigation.setOptions({
      headerRight: () => <RightSideButtons />,
    });
  }, [navigation]);

  return (
    <LinearGradientBackground>
      <ScrollView>
        <ScreenContainer hasTopBar headerTransparent>
          <Image
            style={imageStyle}
            source={require('@/assets/RewardMeCard.png')}
          />
          <View style={userRowContainer}>
            <UserIcon style={bigAccountIcon} />
            <View style={rightContainer}>
              <AppText variant="heading5" style={name(theme)}>
                {data?.userProfile?.name}
              </AppText>
              <View style={rowContainer}>
                <MembershipLevelChip userLevel={userLevel} />
                <AppText variant="caption" style={validDate(theme)}>
                  <FormattedMessage
                    id="valid_until"
                    defaultMessage="Valid until {date}"
                    values={{
                      date: <FormattedDate value={new Date()} />,
                    }}
                  />
                </AppText>
              </View>
            </View>
          </View>
          <View style={sectionsContainer}>
            <ShortcutSection />
            <UpgradeSection userNextLevel={userNextLevel} />
            <PrivilegesSection />
          </View>
        </ScreenContainer>
      </ScrollView>
    </LinearGradientBackground>
  );
};

export default MembershipScreen;
