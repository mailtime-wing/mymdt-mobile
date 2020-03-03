import React from 'react';
import styled from '@emotion/native';

const Container = styled.View`
  background-color: ${props => props.theme.colors.white};
`;

const TitleContainer = styled.View`
  padding: 0 30px;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  font-size: 26px;
`;

const SubTitle = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.black};
  margin-top: 5px;
`;

const TabPage = ({children, title, subTitle}) => (
  <>
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
      </TitleContainer>
    </Container>
    {children}
  </>
);

export default TabPage;
