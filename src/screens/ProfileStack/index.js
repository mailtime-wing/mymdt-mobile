import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LanguageScreen from '@/screens/LanguageScreen';
import MenuScreen from '@/screens/MenuScreen';
import SignOutScreen from '@/screens/SignOutScreen';
import UserProfileEditScreen from '@/screens/UserProfileEditScreen';
import BindEmailEditScreen from '@/screens/BindEmailEditScreen';
import MembershipScreen from '@/screens/MembershipScreen';
import SettingScreen from '@/screens/SettingScreen';
import AccountSecurityScreen from '@/screens/AccountSecurityScreen';
import OfferPreferenceEditScreen from '@/screens/OfferPreferenceEditScreen';

import HeaderButton from '@/components/HeaderButton';
import {styles} from './style';

const Stack = createStackNavigator();

const screens = [
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
];

const ProfileStack = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="menu"
      component={MenuScreen}
      options={{
        headerShown: false,
      }}
    />
    {screens.map(screen => (
      <Stack.Screen
        name={screen.name}
        component={screen.component}
        options={{
          headerTransparent: true,
          headerTitleStyle: styles.headerTitle,
          cardStyle: styles.card,
          headerStyle: styles.header,
          headerLeft: () => <HeaderButton isModal root="menu" />,
        }}
      />
    ))}
  </Stack.Navigator>
);

export default ProfileStack;
