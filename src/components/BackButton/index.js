import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {FormattedMessage} from 'react-intl';
import {ButtonContainer, BackArrowIcon, ButtonText, Container} from './style';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <ButtonContainer onPress={() => navigation.goBack()}>
      <Container>
        <BackArrowIcon source={require('@/assets/arrow-left.png')} />
        <ButtonText>
          <FormattedMessage id="back" defaultMessage="back" />
        </ButtonText>
      </Container>
    </ButtonContainer>
  );
};

export default BackButton;
