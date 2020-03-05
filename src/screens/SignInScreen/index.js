import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {AuthContext} from '@/context/auth';

import Input from '@/components/Input';

const SigninScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = useContext(AuthContext);

  const loginOnPressHandler = () => {
    if (email === '' || password === '') {
      Alert.alert('please input both email and password');
    } else {
      signIn(email, password);
    }
  };

  return (
    <View style={style.container}>
      <Text>This is signin screen</Text>
      <View>
        <Text>Email</Text>
        <Input onChangeText={text => setEmail(text)} value={email} />
      </View>
      <View>
        <Text>Password</Text>
        <Input onChangeText={text => setPassword(text)} value={password} />
      </View>
      <TouchableOpacity onPress={loginOnPressHandler}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {},
});

export default SigninScreen;
