import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '@/context/auth';
import {useContext} from 'react';

const SignOutScreen = () => {
  const {signOut} = useContext(AuthContext);
  return (
    <View>
      <Text>This is signout screen</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignOutScreen;
