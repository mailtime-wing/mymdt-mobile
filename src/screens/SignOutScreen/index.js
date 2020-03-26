import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '@/context/auth';
import {useContext} from 'react';

import {Container} from './style';

const SignOutScreen = () => {
  const {signOut} = useContext(AuthContext);
  return (
    <Container>
      <Text>This is signout screen</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default SignOutScreen;
