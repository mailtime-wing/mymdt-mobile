import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'emotion-theming';

import BrowseScreen from '@/screens/BrowseScreen';
import BonusScreen from '@/screens/BonusScreen';
import WalletScreen from '@/screens/WalletScreen';
import RedeemScreen from '@/screens/RedeemScreen';

const Tab = createBottomTabNavigator();

// const Label = ({ color, id }) => <Text style={{color: color}}><FormattedMessage id={id} /></Text>

const TabNavigatorContainer = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Browse"
      activeColor={theme.colors.white}
      inactiveColor={theme.colors.grey.dark}
      tabBarOptions={{
        backgroundColor: 'blue',
        activeTintColor: theme.colors.white,
        activeBackgroundColor: theme.colors.black,
        inactiveTintColor: theme.colors.grey.dark,
        inactiveBackgroundColor: theme.colors.black,
        labelPosition: 'below-icon',
      }}
      barStyle={{backgroundColor: theme.colors.white}}>
      <Tab.Screen
        name="Browse"
        component={BrowseScreen}
        options={
          {
            // tabBarLabel: () => <Label id='setting' color={theme.colors.white}/> // TODO: Handle color change with locale
            // tabBarIcon: () => <BrowseIcon width={24} height={24}/>, //TODO: Handle svg not work
          }
        }
      />
      <Tab.Screen name="Bonus" component={BonusScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Redeem" component={RedeemScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigatorContainer;
