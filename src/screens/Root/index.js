import React, {useContext, useEffect} from 'react';
import {Linking, Button} from 'react-native';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import OnboardingScreen from '@/screens/OnboardingScreen';
import OfferSelectScreen from '@/screens/OfferSelectScreen';
import SignInScreen from '@/screens/SignInScreen';
import SignUpScreen from '@/screens/SignUpScreen';
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
import MembershipScreen from '@/screens/MembershipScreen';
import ChooseRegionScreen from '@/screens/ChooseRegionScreen';
import DataSourceInfoScreen from '@/screens/DataSourceInfoScreen';
import LinkedCardsScreen from '@/screens/LinkedCardsScreen';
import LinkedEmailsScreen from '@/screens/LinkedEmailsScreen';

import LanguageScreen from '@/screens/LanguageScreen';
import SignOutScreen from '@/screens/SignOutScreen';
import NotificationScreen from '@/screens/NotificationScreen';
import UserProfileEditScreen from '@/screens/UserProfileEditScreen';
import BindEmailEditScreen from '@/screens/BindEmailEditScreen';
import SettingScreen from '@/screens/SettingScreen';
import AppSettingScreen from '@/screens/AppSettingScreen';
import AccountSecurityScreen from '@/screens/AccountSecurityScreen';
import OfferPreferenceEditScreen from '@/screens/OfferPreferenceEditScreen';

// wallet page
import ConverterScreen from '@/screens/ConverterScreen';
import WithdrawalScreen from '@/screens/WithdrawalScreen';
import MissingReceiptScreen from '@/screens/MissingReceiptScreen';
import {AuthContext} from '@/context/auth';
import {SetupFlowContext} from '@/context/setupFlow';
import BackButton from '@/components/BackButton';
import CloseButton from '@/components/CloseButton';
import {
  MARGIN_BETWEEN_STATUS_BAR_AND_TOP_BAR,
  TOP_BAR_HEIGHT,
} from '@/constants/layout';

import {styles} from './style';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const screens = [
  {name: 'onboarding', component: OnboardingScreen},
  {name: 'sign_in', component: SignInScreen},
  {name: 'sign_up', component: SignUpScreen},
  {name: 'loading', component: LoadingScreen},
];

const setupScreens = [
  // 1st step: update user profile
  {name: 'user_profile', component: UserProfileScreen},
  // 2nd step: choose cashback type
  {name: 'choose_cash_back_type', component: ChooseCashBackTypeScreen},
  // 3rd step: select offers
  {name: 'welcome', component: WelcomeScreen},
  {name: 'offer_select', component: OfferSelectScreen},
  // 4rd step: bind email (which is skippable)
  {
    name: 'introduction',
    component: IntroductionScreen,
  },
  {
    name: 'add_email',
    component: BindEmailScreen,
  },
  {
    name: 'linked_emails',
    component: LinkedEmailsScreen,
  },
  {
    name: 'choose_region',
    component: ChooseRegionScreen,
  },
  {
    name: 'data_source_info',
    component: DataSourceInfoScreen,
  },
  {
    name: 'linked_cards',
    component: LinkedCardsScreen,
  },
  // 5th step: turn on notification
  {name: 'notification_permission', component: NotificationPermissionScreen},
  // 6th step: setup done and gain reward
  {name: 'account_setup_done', component: AccountSetupDoneScreen},
  {name: 'sign_up_reward', component: SignUpRewardScreen},
];

const authScreens = [
  {name: 'home', component: HomeStack},
  {name: 'membership', component: MembershipScreen},
];

const authModalScreens = [
  {name: 'notification', component: NotificationScreen},
  // {name: 'my_referral_code', component: UserProfileEditScreen},
  // {name: 'enter_invite_code', component: LanguageScreen},
  {name: 'converter', component: ConverterScreen},
  {name: 'withdrawal', component: WithdrawalScreen},
  {name: 'missing_receipt', component: MissingReceiptScreen},
];

const settingScreens = [
  {name: 'settingsHome', component: SettingScreen},
  {name: 'edit_profile', component: UserProfileEditScreen},
  {name: 'offers_preference_edit', component: OfferPreferenceEditScreen},
  {name: 'offers_preference', component: OfferSelectScreen},
  {name: 'emails_binding', component: BindEmailScreen}, // same as add_email in setupScreens (but different navigator)
  {name: 'emails_binding_edit', component: BindEmailEditScreen}, // enter by the user menu
  {name: 'account_security', component: AccountSecurityScreen},
  {name: 'sign_out', component: SignOutScreen},
  {name: 'app_settings', component: AppSettingScreen},
  {name: 'language', component: LanguageScreen},
  {name: 'faq_and_support', component: LanguageScreen},
  {name: 'terms_of_service', component: LanguageScreen},
  {name: 'privacy_policy', component: LanguageScreen},
  {name: 'about_us', component: LanguageScreen},
];

const backScreen = [
  'sign_in',
  'sign_up',
  'welcome',
  'offer_select',
  'add_email',
  'membership',
  'choose_region',
  'data_source_info',
];

const linkingConfig = {
  // invitefd://. (go to invite friend page)
  // secureaccount:// (go to secure account page)
  // bindemail:// (go to bind email page)
  // bindbank:// (go to bind bank account page)
  // internalweb://
  // externalweb://
  initialRouteName: 'home',
  screens: {
    account_security: {
      path: 'secureaccount',
      exact: true,
    },
    emails_binding: {
      path: 'bindemail',
      exact: true,
    },
    // no banks_account_binding and invite_friend screen at this moment
    // TODO: handle internalweb and externalweb

    // banks_account_binding: {
    //   path: 'bindbank',
    //   exact: true
    // },
    // invite_friend: {
    //   path: 'invitefd',
    //   exact: true
    // },

    home: {
      // return to home if the path not match
      path: '*',
    },
  },
};

const linking = {
  // e.g. rewardme://secureaccount
  prefixes: ['rewardme://'],
  config: linkingConfig,
};

const SettingStack = createStackNavigator();
const screenUnderModalOptions = {
  headerTitle: null,
  headerStyle: {
    height: 84,
  },
  headerLeftContainerStyle: {
    paddingLeft: 24,
  },
  headerTransparent: true,
  cardStyle: [styles.card, styles.modalCard],
  headerStatusBarHeight: 0,
  headerStyleInterpolator: HeaderStyleInterpolators.forSlideLeft,
};

const Setting = ({navigation}) => {
  return (
    <SettingStack.Navigator
      screenOptions={{
        ...screenUnderModalOptions,
        headerLeft: ({onPress}) => {
          return onPress ? (
            <Button onPress={onPress} title="<" />
          ) : (
            <CloseButton onPress={() => navigation.goBack()} />
          );
        },
      }}>
      {settingScreens.map(({name, ...props}) => (
        <SettingStack.Screen key={name} name={name} {...props} />
      ))}
    </SettingStack.Navigator>
  );
};

const Main = () => {
  const {authToken} = useContext(AuthContext);
  const {validScreenNames} = useContext(SetupFlowContext);
  const {top} = useSafeAreaInsets();

  const headerStyle = {
    ...styles.header,
    height: top + MARGIN_BETWEEN_STATUS_BAR_AND_TOP_BAR + TOP_BAR_HEIGHT,
  };

  return (
    <MainStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: styles.headerTitle,
        cardStyle: styles.card,
        headerStyle: headerStyle,
        gestureEnabled: false,
        headerStyleInterpolator: HeaderStyleInterpolators.forSlideLeft,
      }}>
      {!authToken &&
        screens.map(screen => (
          <MainStack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              headerLeft: props =>
                backScreen.includes(screen.name) ? (
                  <BackButton {...props} />
                ) : null,
            }}
          />
        ))}
      {// TODO: hide setupScreens so that it cannot be back from authScreens
      authToken &&
        setupScreens
          .filter(setupScreen => validScreenNames[setupScreen.name])
          .map((screen, i) => {
            const {name, component} = screen;
            return (
              <MainStack.Screen
                key={name}
                name={name}
                component={component}
                options={{
                  headerLeft: props =>
                    backScreen.includes(name) ? (
                      <BackButton {...props} />
                    ) : null,
                }}
              />
            );
          })}
      {authToken &&
        authScreens.map(screen => (
          <MainStack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              headerLeft: props =>
                backScreen.includes(screen.name) ? (
                  <BackButton {...props} />
                ) : null,
            }}
          />
        ))}
    </MainStack.Navigator>
  );
};

const Root = () => {
  const {authToken} = useContext(AuthContext);

  useEffect(() => {
    Linking.addEventListener('url');
    return () => {
      Linking.removeEventListener('url');
    };
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <RootStack.Navigator
        mode="modal"
        screenOptions={{
          ...TransitionPresets.ModalPresentationIOS,
          headerTransparent: true,
          headerTitle: null,
          cardStyle: [styles.card, styles.modalCard],
          headerLeft: props => <CloseButton {...props} />,
          cardOverlayEnabled: true,
          gestureEnabled: true,
          headerStatusBarHeight: 0,
        }}>
        <RootStack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        {authToken && (
          <RootStack.Screen
            name="settings"
            component={Setting}
            options={{headerShown: false}}
          />
        )}
        {authToken &&
          authModalScreens.map(screen => (
            <RootStack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
              options={screenUnderModalOptions}
            />
          ))}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
