import React from 'react';

import {
  Button,
  ButtonView,
  TextContainer,
  ButtonTitle,
  ButtonCaption,
} from './style';
import {useTheme} from 'emotion-theming';

const BindingButton = ({icon, title, caption, ...props}) => {
  const theme = useTheme();
  return (
    <Button {...props}>
      <ButtonView style={theme.colors.elevatedBackground1}>
        {icon}
        <TextContainer>
          <ButtonTitle>{title}</ButtonTitle>
          <ButtonCaption>{caption}</ButtonCaption>
        </TextContainer>
      </ButtonView>
    </Button>
  );
};

export default BindingButton;
