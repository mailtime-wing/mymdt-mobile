import React from 'react';
import {TouchableOpacity} from 'react-native';
import {AccountIcon, Container, AccountContainer, RemainMDT} from './style';

const AccountBar = ({navigation}) => (
  <Container>
    <AccountContainer>
      <TouchableOpacity onPress={() => navigation?.navigate('membership')}>
        <AccountIcon source={require('@/assets/zt-mask.jpg')} />
      </TouchableOpacity>
      <RemainMDT>6,543 MDT</RemainMDT>
    </AccountContainer>
  </Container>
);

export default AccountBar;
