import React, {useEffect} from 'react';
import {Keyboard} from 'react-native';
import {FormattedMessage} from 'react-intl';

import ModalContaienr from '@/components/ModalContainer';
import ThemeButton from '@/components/ThemeButton';

import {ScrollContainer, Container, Detail} from './style';

const PinSuccessScreen = ({navigation, route}) => {
  useEffect(() => {
    Keyboard.dismiss();
  }, []);
  return (
    <ModalContaienr
      title={<FormattedMessage id="success" defaultMessage="success" />}>
      <ScrollContainer>
        <Container>
          <Detail>{route?.params?.pin_action}</Detail>
          <ThemeButton onPress={() => navigation.pop(2)}>
            <FormattedMessage
              id="back_to_account_security"
              defaultMessage="Back to account security"
            />
          </ThemeButton>
        </Container>
      </ScrollContainer>
    </ModalContaienr>
  );
};

export default PinSuccessScreen;