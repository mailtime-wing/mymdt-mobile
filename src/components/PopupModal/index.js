import React, {useState} from 'react';
import {
  Title,
  Detail,
  Modal,
  CenteredView,
  ModalView,
  ButtonContainer,
  MarginContainer,
} from './style';
import {FormattedMessage} from 'react-intl';

import ThemeButton from '@/components/ThemeButton';

const PopupModal = ({title, detail, callback, buttonWording}) => {
  const [show, setShow] = useState(true);

  const handleCancelPress = () => {
    setShow(false);
    !!callback && callback('CANCEL');
  };

  const handleOkPress = () => {
    setShow(false);
    !!callback && callback('OK');
  };

  return (
    <CenteredView>
      <Modal transparent={true} visible={show}>
        <CenteredView>
          <ModalView>
            <Title>{title}</Title>
            <Detail>{detail}</Detail>
            <ButtonContainer>
              <ThemeButton medium reverse onPress={handleCancelPress}>
                {buttonWording?.cancel ? (
                  buttonWording.cancel
                ) : (
                  <FormattedMessage id="cancel" defaultMessage="cancel" />
                )}
              </ThemeButton>
              <MarginContainer />
              <ThemeButton medium onPress={handleOkPress}>
                {buttonWording?.confirm ? (
                  buttonWording.confirm
                ) : (
                  <FormattedMessage id="okay" defaultMessage="OKAY" />
                )}
              </ThemeButton>
            </ButtonContainer>
          </ModalView>
        </CenteredView>
      </Modal>
    </CenteredView>
  );
};

export default PopupModal;
