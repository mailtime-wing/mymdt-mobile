import React from 'react';
import {FormattedMessage} from 'react-intl';

import {Container, Title, Detail, ScrollContainer} from './style';

const AccountSetupDoneScreen = ({route, navigation}) => {
  return (
    <Container
      activeOpacity={1}
      onPress={() => navigation.navigate(route.params.next)}>
      <ScrollContainer>
        <Title>
          <FormattedMessage id="success" defaultMessage="SUCCESS" />
        </Title>
        <Detail>
          <FormattedMessage
            id="account_setup_done"
            defaultMessage="Your account has been set up"
          />
        </Detail>
      </ScrollContainer>
    </Container>
  );
};

export default AccountSetupDoneScreen;
