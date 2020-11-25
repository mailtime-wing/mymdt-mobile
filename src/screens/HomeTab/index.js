import React from 'react';
import {FormattedMessage} from 'react-intl';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from 'emotion-theming';
import AppText from '@/components/AppText2';

import {styles, label} from './style';

import HomeScreen from '@/screens/HomeScreen';
import BonusScreen from '@/screens/BonusScreen';
import WalletScreen from '@/screens/WalletScreen';
// import RedeemScreen from '@/screens/RedeemScreen';

import HomeIcon from '@/assets/home.svg';
import BonusIcon from '@/assets/bonus.svg';
// import RedeemIcon from '@/assets/redeem.svg';
import WalletIcon from '@/assets/wallet.svg';

const Tab = createBottomTabNavigator();

const HomeTab = () => {
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

  const tabScreens = [
    {
      name: 'home',
      component: HomeScreen,
      svgIcon: HomeIcon,
    },
    {name: 'bonus', component: BonusScreen, svgIcon: BonusIcon},
    // {name: 'redeem', component: RedeemScreen, svgIcon: RedeemIcon},
    {
      name: 'wallet',
      component: WalletScreen,
      svgIcon: WalletIcon,
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="home"
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
      {tabScreens.map(
        ({name, component, svgIcon: SvgIcon, screenProps, options}) => (
          <Tab.Screen
            key={name}
            name={name}
            {...screenProps}
            component={component}
            options={{
              tabBarLabel: ({focused}) => (
                <AppText
                  variant="moreCompactButton"
                  style={label(theme, focused)}>
                  <FormattedMessage id={name} />
                </AppText>
              ),
              tabBarIcon: ({focused}) => (
                <SvgIcon
                  width={iconWidth}
                  height={iconHeight}
                  strokeWidth={strokeWidth}
                  stroke={focused ? white : grey}
                />
              ),
            }}
          />
        ),
      )}
    </Tab.Navigator>
  );
};

export default HomeTab;
