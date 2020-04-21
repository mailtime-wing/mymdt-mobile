import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MembershipScreen from '@/screens/MembershipScreen';

import HeaderButton from '@/components/HeaderButton';

const Stack = createStackNavigator();

const screens = [{name: 'membership', component: MembershipScreen}];

const ModalStack = () => {
  return (
    <Stack.Navigator>
      {screens.map(screen => (
        <Stack.Screen
          name={screen.name}
          component={screen.component}
          options={{
            headerTransparent: true,
            headerTitleStyle: {display: 'none'},
            headerStyle: {height: 80},
            headerLeft: () => <HeaderButton isModal root="home" />,
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default ModalStack;
