import React from 'react';
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

const Container = styled.View`
  margin-top: 16px;
  padding-top: 40px;
  padding-bottom: 30px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: ${props => props.theme.colors.white};
`;

const ScrollContainer = styled.ScrollView`
  background-color: ${props => props.theme.colors.white};
`;

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  margin-top: 30px;
  margin-left: 30px;
`;

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

const StackNavigationContainer = ({setShowModal}) => (
  <Stack.Navigator
  // screenOptions={{
  //   headerStyle: {
  //     // marginTop: 30,
  //     backgroundColor: 'pink',
  //   },
  // }}
  >
    {screens.map(screen => (
      <Stack.Screen
        name={screen.name}
        component={props => (
          <Container>
            <ScrollContainer>
              <screen.component {...props} />
            </ScrollContainer>
          </Container>
        )}
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

export default StackNavigationContainer;
