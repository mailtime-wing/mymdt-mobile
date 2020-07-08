import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import LanguageScreen from '@/screens/LanguageScreen';
import MenuScreen from '@/screens/MenuScreen';
import SignOutScreen from '@/screens/SignOutScreen';
import UserProfileEditScreen from '@/screens/UserProfileEditScreen';
import BindEmailEditScreen from '@/screens/BindEmailEditScreen';
import MembershipScreen from '@/screens/MembershipScreen';
import SettingScreen from '@/screens/SettingScreen';
import AccountSecurityScreen from '@/screens/AccountSecurityScreen';
import OfferPreferenceEditScreen from '@/screens/OfferPreferenceEditScreen';
import ChangePinScreen from '@/screens/ChangePinScreen';
import PinSuccessScreen from '@/screens/PinSuccessScreen';

import CloseButton from '@/components/CloseButton';

import {
  MARGIN_BETWEEN_MODAL_HEAD_AND_TOP_BAR,
  TOP_BAR_HEIGHT,
} from '@/constants/layout';
import {styles} from './style';

const Stack = createStackNavigator();

const screens = [
  {name: 'menu', component: MenuScreen},
  {name: 'edit_profile', component: UserProfileEditScreen},
  {name: 'membership', component: MembershipScreen},
  {name: 'my_referral_code', component: LanguageScreen},
  {name: 'offers_preference', component: OfferPreferenceEditScreen},
  {name: 'emails_binding', component: BindEmailEditScreen},
  {name: 'account_security', component: AccountSecurityScreen},
  {name: 'enter_invite_code', component: LanguageScreen},
  {name: 'sign_out', component: SignOutScreen},
  {name: 'settings', component: SettingScreen},
  {name: 'language', component: LanguageScreen},
  {name: 'faq_and_support', component: LanguageScreen},
  {name: 'terms_of_service', component: LanguageScreen},
  {name: 'privacy_policy', component: LanguageScreen},
  {name: 'about_us', component: LanguageScreen},
  {name: 'change_pin', component: ChangePinScreen},
  {name: 'forget_pin', component: ChangePinScreen},
  {name: 'pin_success', component: PinSuccessScreen},
];

const ProfileStack = () => {
  const {top} = useSafeAreaInsets();

  const headerStyle = {
    ...styles.header,
    height: MARGIN_BETWEEN_MODAL_HEAD_AND_TOP_BAR + TOP_BAR_HEIGHT,
  };

  const cardStyle = {
    ...styles.card,
    marginTop: top,
  };

  return (
    <Stack.Navigator mode="modal">
      {screens.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            headerTransparent: true,
            headerTitleStyle: styles.headerTitle,
            cardStyle: cardStyle,
            headerStyle: headerStyle,
            headerLeft: props => <CloseButton {...props} />,
            cardOverlayEnabled: true,
            gestureEnabled: true,
            headerStatusBarHeight: 0,
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default ProfileStack;
