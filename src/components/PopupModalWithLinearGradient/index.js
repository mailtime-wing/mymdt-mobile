import React, {useState} from 'react';
import {Modal, CenteredView, ModalView, Container} from './style';

import ThemeButton from '@/components/ThemeButton';
import LinearGradientBackground from '@/components/LinearGradientBackground';

const linearGradientStyle = {
  borderRadius: 24,
  flex: 0,
};

const PopupModalWithLinearGradient = ({children, callback, style}) => {
  const [show, setShow] = useState(true);

  const handleOkPress = () => {
    setShow(false);
    !!callback && callback('OK');
  };

  return (
    <CenteredView>
      <Modal transparent={true} visible={show}>
        <CenteredView>
          <ModalView>
            <LinearGradientBackground style={linearGradientStyle}>
              <Container>
                {children}
                <ThemeButton medium width="auto" onPress={handleOkPress}>
                  OKAY
                </ThemeButton>
              </Container>
            </LinearGradientBackground>
          </ModalView>
        </CenteredView>
      </Modal>
    </CenteredView>
  );
};

export default PopupModalWithLinearGradient;
