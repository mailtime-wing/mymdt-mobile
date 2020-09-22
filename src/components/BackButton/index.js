import React from 'react';
import {FormattedMessage} from 'react-intl';
import {ButtonContainer, BackArrowIcon, ButtonText, Container} from './style';

const BackButton = ({navigation, ...props}) => {
  return (
    <ButtonContainer onPress={() => navigation.goBack()} {...props}>
      <Container>
        <BackArrowIcon source={require('@/assets/arrow-left.png')} />
        <ButtonText>
          <FormattedMessage id="button.back" defaultMessage="back" />
        </ButtonText>
      </Container>
    </ButtonContainer>
  );
};

export default BackButton;
