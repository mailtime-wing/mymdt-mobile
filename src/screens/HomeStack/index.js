import React from 'react';
import {FormattedMessage} from 'react-intl';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'emotion-theming';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_CHECK_IN_STATUS_API} from '@/api/data';

import {LabelText, styles} from './style';

import BrowseScreen from '@/screens/BrowseScreen';
import BonusScreen from '@/screens/BonusScreen';
import WalletScreen from '@/screens/WalletScreen';
// import RedeemScreen from '@/screens/RedeemScreen';

import HomeIcon from '@/assets/home.svg';
import BonusIcon from '@/assets/bonus.svg';
// import RedeemIcon from '@/assets/redeem.svg';
import WalletIcon from '@/assets/wallet.svg';

const Tab = createBottomTabNavigator();
const Label = ({focused, id}) => (
  <LabelText focused={focused}>
    <FormattedMessage id={id} />
  </LabelText>
);

const HomeStack = () => {
  const theme = useTheme();
  const {data} = useQueryWithAuth(GET_CHECK_IN_STATUS_API);
  const checkedInToday = data?.userProfile?.checkInStatus?.hasCheckedInToday;
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
          tabBarBadge: checkedInToday ? null : '',
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
  );
};

export default HomeStack;
