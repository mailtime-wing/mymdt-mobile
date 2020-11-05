import React from 'react';
import {FormattedMessage} from 'react-intl';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from 'emotion-theming';
import {APP_BAR_HEIGHT} from '@/constants/layout';

import AppButton from '@/components/AppButton';
import AccountIconWithBadge from '@/components/AccountIconWithBadge';
import ArrowLeftIcon from '@/assets/arrow_left_icon.svg';

import {LabelText, styles} from './style';

import BrowseScreen from '@/screens/BrowseScreen';
import BonusScreen from '@/screens/BonusScreen';
import WalletScreen from '@/screens/WalletScreen';
import MdtDetailScreen from '@/screens/MdtDetailScreen';
import MrpDetailScreen from '@/screens/MrpDetailScreen';
import NewTokenDetailScreen from '@/screens/NewTokenDetailScreen';
// import RedeemScreen from '@/screens/RedeemScreen';

import HomeIcon from '@/assets/home.svg';
import BonusIcon from '@/assets/bonus.svg';
// import RedeemIcon from '@/assets/redeem.svg';
import WalletIcon from '@/assets/wallet.svg';

const BackButton = (props) => {
  return (
    <AppButton
      variant="outlined"
      sizeVariant="normal"
      colorVariant="white"
      svgIcon={ArrowLeftIcon}
      text={<FormattedMessage id="button.back" defaultMessage="back" />}
      {...props}
    />
  );
};

const Tab = createBottomTabNavigator();

const WalletStack = createStackNavigator();
const WalletStackScreen = () => {
  const theme = useTheme();
  const {top} = useSafeAreaInsets();

  const walletScreenOptions = {
    headerStyle: {
      height: top + APP_BAR_HEIGHT,
      elevation: 0,
      shadowColor: 'transparent',
      backgroundColor: theme.colors.secondary.walletBackground,
    },
  };

  return (
    <WalletStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardOverlayEnabled: true,
        headerTitle: null,
        headerStyle: walletScreenOptions.headerStyle,
        headerStatusBarHeight: top,
        headerLeftContainerStyle: {
          paddingLeft: 24,
        },
        cardStyle: {
          backgroundColor: theme.colors.background4,
        },
      }}>
      <WalletStack.Screen
        name="wallet"
        component={WalletScreen}
        options={{
          headerLeft: (props) => <AccountIconWithBadge {...props} />,
        }}
      />
      <WalletStack.Screen
        name="mrp_detail"
        component={MrpDetailScreen}
        options={{
          headerLeft: (props) => <BackButton {...props} />,
        }}
      />
      <WalletStack.Screen
        name="mdt_detail"
        component={MdtDetailScreen}
        options={{
          headerLeft: (props) => <BackButton {...props} />,
          headerStyle: {
            ...walletScreenOptions.headerStyle,
            backgroundColor: theme.colors.primary.walletBackground,
          },
        }}
      />
      <WalletStack.Screen
        name="newToken_detail"
        component={NewTokenDetailScreen}
        options={{
          headerLeft: (props) => <BackButton {...props} />,
        }}
      />
    </WalletStack.Navigator>
  );
};

const Label = ({focused, id}) => (
  <LabelText focused={focused}>
    <FormattedMessage id={id} />
  </LabelText>
);

const HomeStack = () => {
  const theme = useTheme();
  const white = theme.colors.background1;
  const grey = theme.colors.textOnBackground.mediumEmphasis;
  const iconWidth = 24;
  const iconHeight = 24;
  const strokeWidth = 2;
  const {bottom} = useSafeAreaInsets();
  const tabBarContainerStyle = {
    ...styles.tabBarContainer,
    height: bottom ? 89 : styles.tabBarContainer.height,
    backgroundColor: theme.colors.background1,
    borderTopColor: theme.colors.background2,
  };

  return (
    <Tab.Navigator
      initialRouteName="Browse"
      tabBarOptions={{
        activeTintColor: white,
        inactiveTintColor: grey,
        activeBackgroundColor: theme.colors.secondary.normal,
        inactiveBackgroundColor: white,
        labelPosition: 'below-icon',
        style: tabBarContainerStyle,
        // tabStyle: [styles.tabBar, styles.tabBarShadow],
        tabStyle: styles.tabBar, // TODO: no tabstyle for active / inactive
      }}>
      <Tab.Screen
        name="Browse"
        component={BrowseScreen}
        options={{
          tabBarLabel: ({focused}) => <Label id="home" focused={focused} />,
          tabBarIcon: ({focused}) => (
            <HomeIcon
              width={iconWidth}
              height={iconHeight}
              strokeWidth={strokeWidth}
              stroke={focused ? white : grey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bonus"
        component={BonusScreen}
        options={{
          tabBarLabel: ({focused}) => <Label id="bonus" focused={focused} />,
          tabBarIcon: ({focused}) => (
            <BonusIcon
              width={iconWidth}
              height={iconHeight}
              strokeWidth={strokeWidth}
              stroke={focused ? white : grey}
            />
          ),
        }}
      />
      {/* currently disable
      <Tab.Screen
        name="Redeem"
        component={RedeemScreen}
        options={{
          tabBarLabel: ({focused}) => <Label id="redeem" focused={focused} />,
          tabBarIcon: ({focused}) => (
            <RedeemIcon
              width={iconWidth}
              height={iconHeight}
              strokeWidth={strokeWidth}
              stroke={focused ? white : grey}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="wallet"
        component={WalletStackScreen}
        options={{
          tabBarLabel: ({focused}) => <Label id="wallet" focused={focused} />,
          tabBarIcon: ({focused}) => (
            <WalletIcon
              width={iconWidth}
              height={iconHeight}
              strokeWidth={strokeWidth}
              stroke={focused ? white : grey}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeStack;
