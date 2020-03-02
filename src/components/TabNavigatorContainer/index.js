import React from 'react';
import {NavigationContainer as Container} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import TabPage from './TabPage';
import Browse from '@/components/Browse';
import Bonus from '@/components/Bonus';
import Wallet from '@/components/Wallet';
import Redeem from '@/components/Redeem';

const Tab = createBottomTabNavigator();

// const Label = ({ color, id }) => <Text style={{color: color}}><FormattedMessage id={id} /></Text>

const TabNavigatorContainer = () => {
  const theme = useTheme();
  return (
    <Container>
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
          component={() => (
            <TabPage
              title={<FormattedMessage id="browse" />}
              subTitle={<FormattedMessage id="browse_details" />}
              contentComponent={<Browse />}
            />
          )}
          options={
            {
              // tabBarLabel: () => <Label id='setting' color={theme.colors.white}/> // TODO: Handle color change with locale
              // tabBarIcon: () => <BrowseIcon width={24} height={24}/>, //TODO: Handle svg not work
            }
          }
        />
        <Tab.Screen
          name="Bonus"
          component={() => (
            <TabPage
              title={<FormattedMessage id="bonus" />}
              contentComponent={<Bonus />}
            />
          )}
        />
        <Tab.Screen
          name="Wallet"
          component={() => (
            <TabPage
              title={<FormattedMessage id="wallet" />}
              contentComponent={<Wallet />}
            />
          )}
        />
        <Tab.Screen
          name="Redeem"
          component={() => (
            <TabPage
              title={<FormattedMessage id="redeem" />}
              subTitle={<FormattedMessage id="redeem_details" />}
              contentComponent={<Redeem />}
            />
          )}
        />
      </Tab.Navigator>
    </Container>
  );
};

export default TabNavigatorContainer;
