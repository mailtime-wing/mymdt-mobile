import React from 'react';
import {
  Container,
  HeaderContainer,
  HeaderRightContainer,
  Title,
  Detail,
  Icon,
} from './style';

const BonusBox = ({title, detail, icon, children}) => (
  <Container>
    <HeaderContainer>
      {icon && <Icon source={icon} />}
      <HeaderRightContainer>
        {title && <Title>{title}</Title>}
        {detail && <Detail>{detail}</Detail>}
      </HeaderRightContainer>
    </HeaderContainer>
    {children}
  </Container>
);

export default BonusBox;
