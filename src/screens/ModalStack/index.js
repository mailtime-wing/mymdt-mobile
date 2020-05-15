import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {styles} from './style';

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
            headerTitleStyle: styles.headerTitle,
            headerStyle: styles.header,
            headerLeft: () => <HeaderButton isModal root="home" />,
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default ModalStack;
