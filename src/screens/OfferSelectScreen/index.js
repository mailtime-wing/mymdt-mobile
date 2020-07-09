import React, {useState, useContext, useCallback} from 'react';
import {FormattedMessage} from 'react-intl';
import {IntlContext} from '@/context/Intl';
import {AuthContext} from '@/context/auth';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {
  GET_BASIC_OFFER_API,
  GET_USER_MEMBERSHIP_API,
  UPDATE_BASIC_OFFER_API,
} from '@/api/data';
import {
  ScrollContainer,
  Container,
  FixedContainer,
  Details,
  Title,
  HightLightText,
  BrandsSelectedText,
} from './style';

import ThemeButton from '@/components/ThemeButton';
import OfferList from '@/components/OfferList';
import PopupModal from '@/components/PopupModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import ScreenContainer from '@/components/ScreenContainer';

const OfferSelectScreen = ({route, navigation}) => {
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isErrorFromOfferList, setIsErrorFromOfferList] = useState(false);
  const {localeEnum} = useContext(IntlContext);
  const {authToken} = useContext(AuthContext);
  const basicOfferApiData = useQuery(GET_BASIC_OFFER_API, {
    variables: {locale: localeEnum},
  });
  const userMembershipApiData = useQuery(GET_USER_MEMBERSHIP_API, {
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
  });
  const [updateBasicOfferRequest] = useMutation(UPDATE_BASIC_OFFER_API);
  const numberOfOffer =
    userMembershipApiData.data &&
    userMembershipApiData.data.userProfile.membership.brandsNumAllowed;

  const formatOfferString = () => {
    const lastOfferIndex = selectedOffers.length - 1;
    const lastOffer = selectedOffers[lastOfferIndex]
      ? selectedOffers[lastOfferIndex].name
      : '';
    let result = selectedOffers
      .map(offer => {
        if (selectedOffers.indexOf(offer) !== lastOfferIndex) {
          return offer.name;
        }
      })
      .join(' and ');
    return result + lastOffer;
  };

  const handlePopupState = state => {
    if (state === 'OK') {
      handleSubmitBasicOffer();
    }
    setShowConfirmPopup(false);
  };

  const handleNextPress = () => {
    setShowConfirmPopup(true);
  };

  const handleError = useCallback(isError => {
    setIsErrorFromOfferList(isError);
  }, []);

  const handleSubmitBasicOffer = async () => {
    try {
      await updateBasicOfferRequest({
        variables: {
          ids: selectedOffers.map(selectedOffer => selectedOffer.id),
        },
        context: {
          headers: {
            authorization: authToken ? `Bearer ${authToken}` : '',
          },
        },
      });
      navigation.navigate(route.params.next);
    } catch (e) {
      console.error(e);
    }
  };

  if (basicOfferApiData.loading || userMembershipApiData.loading) {
    return <LoadingSpinner />;
  }

  if (basicOfferApiData.error || userMembershipApiData.error) {
    return (
      <PopupModal
        title="Error"
        detail="Please try again later"
        callback={navigation.goBack}
      />
    );
  }

  return (
    <Container>
      <ScrollContainer>
        <ScreenContainer hasTopBar>
          <Title>
            <FormattedMessage
              id="special_offer"
              defaultMessage="Special Offer"
            />
          </Title>
          <Details>
            <FormattedMessage
              id="select_offer_details"
              defaultMessage="We also provide a special offer for everyone. You can choose your favorite or frequently spend brands. The cashback rate depends on your membership level."
            />
          </Details>
          <Details>
            <FormattedMessage
              id="please_select_brands"
              defaultMessage="Please choose <FilterText>{number_of_offers} brands/services</FilterText> to earn points with each time you spend there."
              values={{
                number_of_offers: numberOfOffer,
                FilterText: str => <HightLightText>{str}</HightLightText>,
                // TOFIX: formatting not work in react native
              }}
            />
          </Details>
          <OfferList
            offerList={
              basicOfferApiData.data && basicOfferApiData.data.basicOffers
            }
            selectedOffers={selectedOffers}
            setSelectedOffers={setSelectedOffers}
            offersLimit={numberOfOffer}
            onError={handleError}
          />
        </ScreenContainer>
      </ScrollContainer>
      <FixedContainer>
        <BrandsSelectedText isError={isErrorFromOfferList}>
          {isErrorFromOfferList ? (
            <FormattedMessage
              id="more_offers_selected"
              defaultMessage="MORE THAN {numberOfOffer} {offerCount, plural, =0 {brand} one {brand} other {brands}} SELECTED"
              values={{
                numberOfOffer: numberOfOffer,
                offerCount: selectedOffers.length,
              }}
            />
          ) : (
            <FormattedMessage
              id="offers_selected"
              defaultMessage="{numberOfOffer} {offerCount, plural, =0 {brand} one {brand} other {brands}} SELECTED"
              values={{
                numberOfOffer: selectedOffers.length,
                offerCount: selectedOffers.length,
              }}
            />
          )}
        </BrandsSelectedText>
        <ThemeButton
          medium
          onPress={handleNextPress}
          disabled={isErrorFromOfferList}>
          <FormattedMessage id="confirm" defaultMessage="confirm" />
        </ThemeButton>
      </FixedContainer>
      {!!showConfirmPopup && (
        <PopupModal
          title="Confirmation"
          detail={`You have chosen ${formatOfferString()} special offers. You can edit the preference in profile settings afterward.`}
          callback={handlePopupState}
        />
      )}
    </Container>
  );
};

export default OfferSelectScreen;
