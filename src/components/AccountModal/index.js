import React from 'react';
import {Modal} from 'react-native';
import StackNavigationContainer from './StackNavigationContainer';
import styled from '@emotion/native';

const Container = styled.SafeAreaView`
  border-radius: 24px;
  height: 100%;
`;

const AccountModal = props => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.showModal}
      presentationStyle="formSheet">
      <Container>
        <StackNavigationContainer {...props} />
      </Container>
    </Modal>
  );
};

export default AccountModal;
