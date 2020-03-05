import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Image} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import LanguageScreen from '@/screens/LanguageScreen';
import MenuScreen from '@/screens/MenuScreen';
import SignOutScreen from '@/screens/SignOutScreen';
import {ModalContainer, CloseButton} from './style';

const Button = () => {
  const route = useRoute();
  const navigation = useNavigation();
  let isMenu = route.name === 'menu';

  return (
    <CloseButton
      onPress={() =>
        isMenu ? navigation.navigate('Home') : navigation.navigate('menu')
      }>
      {isMenu ? (
        <Image source={require('@/assets/close.png')} />
      ) : (
        <Image source={require('@/assets/return.png')} />
      )}
    </CloseButton>
  );
};

const Stack = createStackNavigator();

const screens = [
  {name: 'menu', component: MenuScreen},
  {name: 'brands_preference', component: LanguageScreen},
  {name: 'profile', component: LanguageScreen},
  {name: 'my_referral_code', component: LanguageScreen},
  {name: 'enter_invite_code', component: LanguageScreen},
  {name: 'sign_out', component: SignOutScreen},
  {name: 'settings', component: LanguageScreen},
  {name: 'faq_and_support', component: LanguageScreen},
  {name: 'terms_of_service', component: LanguageScreen},
  {name: 'privacy_policy', component: LanguageScreen},
  {name: 'about_us', component: LanguageScreen},
];

const StackNavigationContainer = () => (
  <Stack.Navigator>
    {screens.map(screen => (
      <Stack.Screen
        name={screen.name}
        component={screen.component}
        options={{
          headerTransparent: true,
          headerTitleStyle: {display: 'none'},
          headerStyle: {height: 80, backgroundColor: 'blue'},
          headerLeft: () => <Button />,
        }}
      />
    ))}
  </Stack.Navigator>
);

const ModalStack = props => {
  return (
    <ModalContainer>
      <StackNavigationContainer {...props} />
    </ModalContainer>
  );
};

export default ModalStack;
