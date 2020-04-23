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

const PopupModal = ({title, detail}) => {
  const [show, setShow] = useState(true);
  return (
    <CenteredView>
      <Modal transparent={true} visible={show}>
        <CenteredView>
          <ModalView>
            <Title>{title}</Title>
            <Detail>{detail}</Detail>
            <ButtonContainer>
              <ThemeButton small reverse onPress={() => setShow(false)}>
                cancel
              </ThemeButton>
              <MarginContainer />
              <ThemeButton small onPress={() => setShow(false)}>
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
