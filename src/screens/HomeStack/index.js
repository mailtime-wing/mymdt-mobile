import React from 'react';
import {useRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'emotion-theming';
import styled from '@emotion/native';

import AccountBar from '@/components/AccountBar';
import BrowseScreen from '@/screens/BrowseScreen';
import BonusScreen from '@/screens/BonusScreen';
import WalletScreen from '@/screens/WalletScreen';
import RedeemScreen from '@/screens/RedeemScreen';
import ProfileStack from '@/screens/ProfileStack';

const Tab = createBottomTabNavigator();

// const Label = ({ color, id }) => <Text style={{color: color}}><FormattedMessage id={id} /></Text>

const Container = styled.View`
  flex: 1;
`;

const TabNavigatorContainer = navigation => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Browse"
      tabBarOptions={{
        backgroundColor: 'blue',
        activeTintColor: theme.colors.white.normal,
        activeBackgroundColor: theme.colors.black.normal,
        inactiveTintColor: theme.colors.grey.extremeDark,
        inactiveBackgroundColor: theme.colors.black.normal,
        labelPosition: 'below-icon',
      }}
      barStyle={{backgroundColor: theme.colors.white.normal}}>
      <Tab.Screen
        name="Browse"
        component={BrowseScreen}
        options={
          {
            // tabBarLabel: () => <Label id='setting' color={theme.colors.white.normal}/> // TODO: Handle color change with locale
            // tabBarIcon: () => <BrowseIcon width={24} height={24}/>, //TODO: Handle svg not work
          }
        }
      />
      <Tab.Screen name="Bonus" component={BonusScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Redeem" component={RedeemScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
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
