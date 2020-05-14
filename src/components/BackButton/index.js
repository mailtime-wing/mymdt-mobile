import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ButtonContainer, BackArrowIcon, Text, Container} from './style';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <ButtonContainer onPress={() => navigation.goBack()}>
      <Container>
        <BackArrowIcon source={require('@/assets/arrow-left.png')} />
        <Text>BACK</Text>
      </Container>
    </ButtonContainer>
  );
};

export default BackButton;
