import React from 'react';
import {Text} from 'react-native';
import styled from '@emotion/native';
import {FormattedMessage} from 'react-intl';

import TabPage from '@/components/TabNavigatorContainer/TabPage';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${props => props.theme.colors.white};
`;

const WalletScreen = () => (
  <TabPage title={<FormattedMessage id="wallet" />}>
    <Container>
      <Text>This is Wallet Page</Text>
    </Container>
  </TabPage>
);

export default WalletScreen;
