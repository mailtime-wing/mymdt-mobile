import React from 'react';
import {
  Container,
  ContentContainer,
  ButtonContainer,
  ColorBackground,
  Header,
  Details,
  Skip,
} from './style';
import Button from '@/components/Button';
import {FormattedMessage} from 'react-intl';

const OnboardingScreen = ({navigation}) => (
  <Container>
    <ContentContainer>
      <ColorBackground backgroundColor="#DFF7FF" />
      <Header>Collect MDT and redeem them on Gift Cards.</Header>
      <Details>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy
      </Details>
    </ContentContainer>
    <ButtonContainer>
      <Button onPress={() => navigation.navigate('brand_select')}>
        <FormattedMessage id="start_earning_money" />
      </Button>
      <Skip onPress={() => navigation.navigate('sign_in', {isSignUp: false})}>
        <FormattedMessage id="already_have_account" />
      </Skip>
    </ButtonContainer>
  </Container>
);

export default OnboardingScreen;
