import React from 'react';
import {FormattedMessage} from 'react-intl';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'emotion-theming';
import SafeAreaView from 'react-native-safe-area-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {LabelText, styles} from './style';

import BrowseScreen from '@/screens/BrowseScreen';
import BonusScreen from '@/screens/BonusScreen';
import WalletScreen from '@/screens/WalletScreen';
import RedeemScreen from '@/screens/RedeemScreen';

import HomeIcon from '@/assets/home.svg';
import BonusIcon from '@/assets/bonus.svg';
import RedeemIcon from '@/assets/redeem.svg';
import WalletIcon from '@/assets/wallet.svg';

const Tab = createBottomTabNavigator();
const Label = ({focused, id}) => (
  <LabelText focused={focused}>
    <FormattedMessage id={id} />
  </LabelText>
);

const HomeStack = () => {
  const theme = useTheme();
  const white = theme.colors.white.normal;
  const grey = theme.colors.black.light;
  const iconWidth = 24;
  const iconHeight = 24;
  const strokeWidth = 2;
  const {bottom} = useSafeAreaInsets();
  const tabBarContainerStyle = {
    ...styles.tabBarContainer,
    height: bottom ? 89 : styles.tabBarContainer.height,
  };

  return (
    <>
      <SafeAreaView
        style={[styles.safeAreaViewContainer, styles.safeAreaView]}
      />
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
        />
        <Tab.Screen
          name="wallet"
          component={WalletScreen}
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
    </>
  );
};

export default HomeStack;
