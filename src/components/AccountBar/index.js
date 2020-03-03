import React from 'react';
import {TouchableOpacity, SafeAreaView} from 'react-native';
import styled from '@emotion/native';

const AccountIcon = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;

const Container = styled.View`
  justify-content: center;
  padding: 30px;
  background-color: ${props => props.theme.colors.white};
`;

const AccountContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const RemainMDT = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

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
