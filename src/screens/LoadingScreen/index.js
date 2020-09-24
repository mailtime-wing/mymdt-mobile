import React, {useEffect, useState} from 'react';
import {FormattedMessage} from 'react-intl';

import {Container, Status, Detail} from './style';

import Button from '@/components/Button';

const LoadingScreen = ({navigation, route}) => {
  const [finishSetup, setFinishSetup] = useState(false);
  const {authToken, refreshToken} = route.params;

  useEffect(() => {
    setTimeout(() => setFinishSetup(true), 3000);
  }, []);

  return (
    <Container>
      <Status>
        {!finishSetup ? (
          <FormattedMessage id="setting_up_account" />
        ) : (
          <FormattedMessage id="searching_for_receipts" />
        )}
      </Status>
      {finishSetup && (
        <>
          <Detail>
            <FormattedMessage id="it_might_take_some_time" />
          </Detail>
          <Button
            onPress={() =>
              navigation.navigate('notification_permission', {
                authToken: authToken,
                refreshToken: refreshToken,
              })
            }>
            <FormattedMessage id="button.next" />
          </Button>
        </>
      )}
    </Container>
  );
};

export default LoadingScreen;
