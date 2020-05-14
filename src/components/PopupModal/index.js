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

import ThemeButton from '@/components/ThemeButton';

const PopupModal = ({title, detail, callback}) => {
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
              <ThemeButton small reverse onPress={handleCancelPress}>
                cancel
              </ThemeButton>
              <MarginContainer />
              <ThemeButton small onPress={handleOkPress}>
                OKAY
              </ThemeButton>
            </ButtonContainer>
          </ModalView>
        </CenteredView>
      </Modal>
    </CenteredView>
  );
};

export default PopupModal;
