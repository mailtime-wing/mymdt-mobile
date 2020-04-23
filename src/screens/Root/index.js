import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer as Container} from '@react-navigation/native';
import {AuthContext} from '@/context/auth';

import {UpperSafeAreaView, LowerSafeAreaView} from './style';

import OnboardingScreen from '@/screens/OnboardingScreen';
import BrandSelectScreen from '@/screens/BrandSelectScreen';
import BrandSelectConfirmScreen from '@/screens/BrandSelectConfirmScreen';
import SignInScreen from '@/screens/SignInScreen';
import UserProfileScreen from '@/screens/UserProfileScreen';
import BindEmailScreen from '@/screens/BindEmailScreen';
import LoadingScreen from '@/screens/LoadingScreen';
import NotificationScreen from '@/screens/NotificationScreen';
import AccountSetupDoneScreen from '@/screens/AccountSetupDoneScreen';
import VerifyPhoneNumberScreen from '@/screens/VerifyPhoneNumberScreen';
import HomeStack from '@/screens/HomeStack';
import ModalStack from '@/screens/ModalStack';

import BackButton from '@/components/BackButton';

const Stack = createStackNavigator();

const screens = [
  {name: 'onboarding', component: OnboardingScreen},
  {name: 'sign_in', component: SignInScreen},
  {name: 'brand_select', component: BrandSelectScreen},
  {name: 'brand_select_confirm', component: BrandSelectConfirmScreen},
  {name: 'verify_phone_number', component: VerifyPhoneNumberScreen},
  {name: 'user_profile', component: UserProfileScreen},
  {name: 'bind_email', component: BindEmailScreen},
  {name: 'loading', component: LoadingScreen},
  {name: 'notification', component: NotificationScreen},
  {name: 'account_setup_done', component: AccountSetupDoneScreen},
];

const noBackScreen = [
  'onboarding',
  'loading',
  'notification',
  'account_setup_done',
];

const Root = () => {
  const {authToken} = useContext(AuthContext);
  return (
    <>
      <UpperSafeAreaView />
      <LowerSafeAreaView>
        <Container>
          {authToken == null ? (
            <Stack.Navigator>
              {screens.map(screen => (
                <Stack.Screen
                  name={screen.name}
                  component={screen.component}
                  options={{
                    headerTransparent: true,
                    headerTitleStyle: {display: 'none'},
                    cardStyle: {backgroundColor: 'white'},
                    headerStyle: {height: 80},
                    headerLeft: () =>
                      noBackScreen.includes(screen.name) ? null : (
                        // <HeaderButton root="onboarding" />
                        <BackButton />
                      ),
                  }}
                />
              ))}
            </Stack.Navigator>
          ) : (
            <Stack.Navigator mode="modal" headerMode="none">
              <Stack.Screen name="home" component={HomeStack} />
              <Stack.Screen name="modal" component={ModalStack} />
            </Stack.Navigator>
          )}
        </Container>
      </LowerSafeAreaView>
    </>
  );
};

export default Root;
