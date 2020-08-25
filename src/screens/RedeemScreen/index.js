import React from 'react';
import {Text} from 'react-native';
import styled from '@emotion/native';
import {FormattedMessage} from 'react-intl';

import TabPage from '@/components/TabPage';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${props => props.theme.colors.background1};
`;

const RedeemScreen = () => (
  <TabPage
    title={<FormattedMessage id="redeem" />}
    subTitle={<FormattedMessage id="redeem_details" />}>
    <Container>
      <Text>This is Redeem Page</Text>
    </Container>
  </TabPage>
);

export default RedeemScreen;
