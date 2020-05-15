import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ButtonContainer, BackArrowIcon, ButtonText, Container} from './style';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <ButtonContainer onPress={() => navigation.goBack()}>
      <Container>
        <BackArrowIcon source={require('@/assets/arrow-left.png')} />
        <ButtonText>BACK</ButtonText>
      </Container>
    </ButtonContainer>
  );
};

export default BackButton;
