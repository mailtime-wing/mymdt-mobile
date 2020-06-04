import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Container, Details, EditLater} from './style';

import ThemeButton from '@/components/ThemeButton';
import OfferList from '@/components/OfferList';

const OfferSelectConfirmScreen = ({route, navigation}) => {
  const {numberOfBrand} = route.params;
  const {selectedOffers} = route.params;

  const handleConfirmPress = () => {
    navigation.navigate('sign_in', {
      isSignUp: true,
      selectedOffers: selectedOffers,
    });
  };

  return (
    <Container>
      <Details>
        <FormattedMessage
          id="confirm_select_offer_details"
          defaultMessage="Once you shop in these {number_of_offers} brands, you will earn cash back."
          values={{
            number_of_offers: numberOfBrand,
          }}
        />
      </Details>
      <Details>
        <FormattedMessage
          id="please_confirm_brands"
          defaultMessage="If you’re happy with the offer, please confirm your choice."
        />
      </Details>
      <OfferList offerList={selectedOffers} />
      <ThemeButton onPress={handleConfirmPress}>
        <FormattedMessage id="confirm" default="Confirm" />
      </ThemeButton>
      <EditLater>
        <FormattedMessage
          id="edit_prefernece_afterward"
          defaultMessage="You can edit the preference in settings afterward"
        />
      </EditLater>
    </Container>
  );
};

export default OfferSelectConfirmScreen;
