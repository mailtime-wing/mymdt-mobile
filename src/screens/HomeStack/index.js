import React from 'react';
import {FormattedMessage} from 'react-intl';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'emotion-theming';
import SafeAreaView from 'react-native-safe-area-view';

import {Container, LabelText, styles} from './style';

import BrowseScreen from '@/screens/BrowseScreen';
import BonusScreen from '@/screens/BonusScreen';
import PointScreen from '@/screens/PointScreen';
import RedeemScreen from '@/screens/RedeemScreen';

import BrowseIcon from '@/assets/browse.svg';
import BonusIcon from '@/assets/bonus.svg';
import RedeemIcon from '@/assets/redeem.svg';
import PointIcon from '@/assets/point.svg';

const Tab = createBottomTabNavigator();

const Label = ({focused, id}) => (
  <LabelText focused={focused}>
    <FormattedMessage id={id} />
  </LabelText>
);

const TabNavigatorContainer = () => {
  const theme = useTheme();
  const white = theme.colors.white.normal;
  const grey = theme.colors.black.light;
  const iconWidth = 24;
  const iconHeight = 24;
  const strokeWidth = 2;

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
          style: styles.tabBarContainer,
          // tabStyle: [styles.tabBar, styles.tabBarShadow],
          tabStyle: styles.tabBar, // TODO: no tabstyle for active / inactive
        }}>
        <Tab.Screen
          name="Browse"
          component={BrowseScreen}
          options={{
            tabBarLabel: ({focused}) => <Label id="browse" focused={focused} />,
            tabBarIcon: ({focused}) => (
              <BrowseIcon
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
          name="Point"
          component={PointScreen}
          options={{
            tabBarLabel: ({focused}) => <Label id="point" focused={focused} />,
            tabBarIcon: ({focused}) => (
              <PointIcon
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

const HomeStack = props => {
  return (
    <Container>
      <TabNavigatorContainer {...props} />
    </Container>
  );
};

export default HomeStack;
