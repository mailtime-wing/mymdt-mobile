import React from 'react';
import {FormattedMessage} from 'react-intl';
import {useRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'emotion-theming';
import styled from '@emotion/native';

import {LabelText, styles} from './style';

import AccountBar from '@/components/AccountBar';
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

const Container = styled.View`
  flex: 1;
`;

const TabNavigatorContainer = () => {
  const theme = useTheme();
  const white = theme.colors.white.normal;
  const grey = theme.colors.black.light;
  const iconWidth = 24;
  const iconHeight = 24;
  const strokeWidth = 2;

  return (
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
  );
};

const excludeRouteNames = ['Profile'];

const HomeStack = props => {
  const route = useRoute();
  const tabName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Browse';
  return (
    <Container>
      {!excludeRouteNames.includes(tabName) && <AccountBar {...props} />}
      <TabNavigatorContainer {...props} />
    </Container>
  );
};

export default HomeStack;
