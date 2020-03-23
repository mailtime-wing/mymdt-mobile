import React, {useContext} from 'react';
import {FormattedMessage} from 'react-intl';
import {AuthContext} from '@/context/auth';

import Button from '@/components/Button';

import {Container, Title, Detail} from './style';

const AccountSetupDoneScreen = ({route}) => {
  const {updateAuthToken} = useContext(AuthContext);
  const {authToken} = route.params;

  const onPressDoneHandler = () => {
    updateAuthToken(authToken);
  };

  return (
    <Container>
      <Title>
        <FormattedMessage id="all_done" />
      </Title>
      <Detail>
        <FormattedMessage id="let_your_cash_back" />
      </Detail>
      <Button onPress={() => onPressDoneHandler()}>
        <FormattedMessage id="see_today_offer" />
      </Button>
    </Container>
  );
};

export default AccountSetupDoneScreen;
