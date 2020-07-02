import React from 'react';
import {
  Container,
  HeaderContainer,
  HeaderLeftContainer,
  HeaderRightContainer,
  Title,
  Detail,
  Icon,
} from './style';

const BonusBox = ({title, detail, icon, children}) => (
  <Container>
    <HeaderContainer>
      {icon && (
        <HeaderLeftContainer>
          <Icon source={icon} />
        </HeaderLeftContainer>
      )}
      <HeaderRightContainer>
        {title && <Title>{title}</Title>}
        {detail && <Detail>{detail}</Detail>}
      </HeaderRightContainer>
    </HeaderContainer>
    {children}
  </Container>
);

export default BonusBox;
