import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer as Container} from '@react-navigation/native';
import {AuthContext} from '@/context/auth';

import {UpperSafeAreaView, LowerSafeAreaView, styles} from './style';

import OnboardingScreen from '@/screens/OnboardingScreen';
import OfferSelectScreen from '@/screens/OfferSelectScreen';
import SignInScreen from '@/screens/SignInScreen';
import UserProfileScreen from '@/screens/UserProfileScreen';
import BindEmailScreen from '@/screens/BindEmailScreen';
import LoadingScreen from '@/screens/LoadingScreen';
import NotificationPermissionScreen from '@/screens/NotificationPermissionScreen';
import AccountSetupDoneScreen from '@/screens/AccountSetupDoneScreen';
import ChooseCashBackTypeScreen from '@/screens/ChooseCashBackTypeScreen';
import IntroductionScreen from '@/screens/IntroductionScreen';
import WelcomeScreen from '@/screens/WelcomeScreen';
import SignUpRewardScreen from '@/screens/SignUpRewardScreen';
import HomeStack from '@/screens/HomeStack';
import ModalStack from '@/screens/ModalStack';

import BackButton from '@/components/BackButton';

const Stack = createStackNavigator();

const screens = [
  {name: 'onboarding', component: OnboardingScreen},
  {name: 'sign_in', component: SignInScreen},
  {name: 'loading', component: LoadingScreen},
];

const authScreens = [
  {name: 'choose_cash_back_type', component: ChooseCashBackTypeScreen},
  {name: 'welcome', component: WelcomeScreen},
  {name: 'offer_select', component: OfferSelectScreen},
  {name: 'introduction', component: IntroductionScreen},
  {name: 'notification_permission', component: NotificationPermissionScreen},
  {name: 'account_setup_done', component: AccountSetupDoneScreen},
  {name: 'sign_up_reward', component: SignUpRewardScreen},
  {name: 'home', component: HomeStack},
  {name: 'ModalStack', component: ModalStack},
];

const backScreen = ['sign_in', 'welcome', 'offer_select'];

const Root = () => {
  const {authToken, isEmailBound, isProfileCompleted} = useContext(AuthContext);

  return (
    <>
      <UpperSafeAreaView />
      <LowerSafeAreaView>
        <Container>
          {!authToken ? (
            <Stack.Navigator>
              {screens.map(screen => (
                <Stack.Screen
                  name={screen.name}
                  component={screen.component}
                  options={{
                    headerTransparent: true,
                    headerTitleStyle: styles.headerTitle,
                    cardStyle: styles.card,
                    headerStyle: styles.header,
                    headerLeft: () =>
                      backScreen.includes(screen.name) ? <BackButton /> : null,
                    gestureEnabled: false,
                  }}
                />
              ))}
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              {!isProfileCompleted && (
                <Stack.Screen
                  name="user_profile"
                  component={UserProfileScreen}
                  options={{
                    headerTransparent: true,
                    cardStyle: styles.card,
                    headerTitleStyle: styles.headerTitle,
                    gestureEnabled: false,
                  }}
                />
              )}
              {!isEmailBound && (
                <Stack.Screen
                  name="bind_email"
                  component={BindEmailScreen}
                  options={{
                    headerTransparent: true,
                    cardStyle: styles.card,
                    headerTitleStyle: styles.headerTitle,
                    gestureEnabled: false,
                  }}
                />
              )}
              {authScreens.map(screen => (
                <Stack.Screen
                  name={screen.name}
                  component={screen.component}
                  options={{
                    headerTransparent: true,
                    headerTitleStyle: styles.headerTitle,
                    cardStyle: styles.card,
                    headerStyle: styles.header,
                    headerLeft: () =>
                      backScreen.includes(screen.name) ? <BackButton /> : null,
                    gestureEnabled: false,
                  }}
                />
              ))}
            </Stack.Navigator>
          )}
        </Container>
      </LowerSafeAreaView>
    </>
  );
};

export default Root;
