import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from '@emotion/native';

import AccountModal from '@/components/AccountModal';

const AccountIcon = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;

const Container = styled.View`
  justify-content: center;
  padding: 30px;
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

const AccountBar = props => {
  const [showModal, setShowModal] = useState(false);
  console.log('props.navigation', props.navigation);
  return (
    <>
      <Container>
        <AccountContainer>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <AccountIcon source={require('@/assets/zt-mask.jpg')} />
          </TouchableOpacity>
          <RemainMDT>6,543 MDT</RemainMDT>
        </AccountContainer>
      </Container>
      <AccountModal
        showModal={showModal}
        setShowModal={setShowModal}
        {...props}
      />
    </>
  );
};

export default AccountBar;
