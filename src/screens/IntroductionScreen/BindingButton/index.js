import React from 'react';

import {
  Button,
  ButtonView,
  TextContainer,
  ButtonTitle,
  ButtonCaption,
} from './style';

const BindingButton = ({icon, title, caption, ...props}) => (
  <Button {...props}>
    <ButtonView>
      {icon}
      <TextContainer>
        <ButtonTitle>{title}</ButtonTitle>
        <ButtonCaption>{caption}</ButtonCaption>
      </TextContainer>
    </ButtonView>
  </Button>
);

export default BindingButton;
