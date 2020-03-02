import React from 'react';
import {NavigationContainer as Container} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import styled from '@emotion/native';
import {Image} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import LanguageScreen from '@/screens/LanguageScreen';
import Menu from '@/screens/MenuScreen';

const Stack = createStackNavigator();

const screens = [
  {name: 'menu', component: Menu},
  {name: 'brands_preference', component: LanguageScreen},
  {name: 'profile', component: LanguageScreen},
  {name: 'my_referral_code', component: LanguageScreen},
  {name: 'enter_invite_code', component: LanguageScreen},
  {name: 'sign_out', component: LanguageScreen},
  {name: 'settings', component: LanguageScreen},
  {name: 'faq_and_support', component: LanguageScreen},
  {name: 'terms_of_service', component: LanguageScreen},
  {name: 'privacy_policy', component: LanguageScreen},
  {name: 'about_us', component: LanguageScreen},
];

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  margin-top: 30px;
  margin-left: 30px;
`;

const Button = ({setShowModal}) => {
  const route = useRoute();
  const navigation = useNavigation();
  let isMenu = route.name === 'menu';

  return (
    <CloseButton
      onPress={() => (isMenu ? setShowModal(false) : navigation.goBack())}>
      {isMenu ? (
        <Image source={require('@/assets/close.png')} />
      ) : (
        <Image source={require('@/assets/return.png')} />
      )}
    </CloseButton>
  );
};

const StackNavigationContainer = ({setShowModal}) => (
  <Container>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          marginTop: 30,
          backgroundColor: 'pink',
        },
      }}>
      {screens.map(screen => (
        <Stack.Screen
          name={screen.name}
          component={props => <screen.component {...props} />}
          options={{
            headerTransparent: true,
            headerTitleStyle: {display: 'none'},
            headerStyle: {height: 80},
            headerLeft: () => <Button setShowModal={setShowModal} />,
          }}
        />
      ))}
    </Stack.Navigator>
  </Container>
);

export default StackNavigationContainer;
