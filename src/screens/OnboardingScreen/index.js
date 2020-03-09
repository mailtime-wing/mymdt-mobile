import React from 'react';
import {Dimensions} from 'react-native';
import {
  Container,
  ContentContainer,
  ColorBackground,
  Header,
  Details,
  Skip,
} from './style';
import Button from '@/components/Button';
import {FormattedMessage} from 'react-intl';

const OnboardingScreen = ({navigation}) => (
  <Container>
    <ContentContainer width={Dimensions.get('window').width}>
      <ColorBackground
        backgroundColor="#DFF7FF"
        width={Dimensions.get('window').width}
      />
      <Header>Collect MDT and redeem them on Gift Cards.</Header>
      <Details>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy
      </Details>
    </ContentContainer>
    <Button onPress={() => navigation.navigate('brand_select')}>
      <FormattedMessage id="start_earning_money" />
    </Button>
    <Skip onPress={() => navigation.navigate('sign_in', {isSignUp: false})}>
      <FormattedMessage id="already_have_account" />
    </Skip>
  </Container>
);

export default OnboardingScreen;
