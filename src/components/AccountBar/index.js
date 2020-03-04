import React from 'react';
import {TouchableOpacity, SafeAreaView} from 'react-native';
import {AccountIcon, Container, AccountContainer, RemainMDT} from './style';

const AccountBar = ({navigation}) => (
  <SafeAreaView>
    <Container>
      <AccountContainer>
        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
          <AccountIcon source={require('@/assets/zt-mask.jpg')} />
        </TouchableOpacity>
        <RemainMDT>6,543 MDT</RemainMDT>
      </AccountContainer>
    </Container>
  </SafeAreaView>
);

export default AccountBar;
