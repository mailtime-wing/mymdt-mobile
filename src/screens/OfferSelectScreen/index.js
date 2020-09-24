import React, {useState, useContext, useCallback} from 'react';
import {FormattedMessage} from 'react-intl';
import {useQuery} from '@apollo/client';
import {useTheme} from 'emotion-theming';

import {IntlContext} from '@/context/Intl';
import AppButton from '@/components/AppButton';
import OfferList from '@/components/OfferList';
import PopupModal from '@/components/PopupModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import ScreenContainer from '@/components/ScreenContainer';
import AppText from '@/components/AppText2';
import useSetupFlow from '@/hooks/useSetupFlow';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {
  GET_BASIC_OFFER_API,
  GET_USER_MEMBERSHIP_API,
  UPDATE_BASIC_OFFER_API,
} from '@/api/data';

import {
  ScrollContainer,
  Container,
  FixedContainer,
  detailStyle,
  titleStyle,
  hightLightText,
  brandSelectedText,
} from './style';

const OfferSelectScreen = ({route, navigation}) => {
  const theme = useTheme();
  const {navigateByFlow} = useSetupFlow();
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isErrorFromOfferList, setIsErrorFromOfferList] = useState(false);
  const {localeEnum} = useContext(IntlContext);
  const basicOfferApiData = useQuery(GET_BASIC_OFFER_API, {
    variables: {locale: localeEnum},
  });
  const userMembershipApiData = useQueryWithAuth(GET_USER_MEMBERSHIP_API);
  const [updateBasicOfferRequest] = useMutationWithAuth(UPDATE_BASIC_OFFER_API);
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
      });

      if (route?.params?.fromOfferPreferenceEditScreen) {
        navigation.goBack();
        return;
      }

      navigateByFlow();
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
          <AppText variant="pageTitle" style={titleStyle(theme)}>
            <FormattedMessage
              id="special_offer"
              defaultMessage="Special Offer"
            />
          </AppText>
          <AppText variant="body1" style={detailStyle(theme)}>
            <FormattedMessage
              id="select_offer_details"
              defaultMessage="We also provide a special offer for everyone. You can choose your favorite or frequently spend brands. The cashback rate depends on your membership level."
            />
          </AppText>
          <AppText variant="body1" style={detailStyle(theme)}>
            <FormattedMessage
              id="please_select_brands"
              defaultMessage="Please choose <FilterText>{number_of_offers} brands/services</FilterText> to earn points with each time you spend there."
              values={{
                number_of_offers: numberOfOffer,
                FilterText: str => (
                  <AppText variant="body1" style={hightLightText(theme)}>
                    {str}
                  </AppText>
                ),
                // TOFIX: formatting not work in react native
              }}
            />
          </AppText>
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
        <AppText
          variant="label"
          style={brandSelectedText(theme, isErrorFromOfferList)}>
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
        </AppText>
        <AppButton
          onPress={handleNextPress}
          disabled={isErrorFromOfferList}
          text={
            <FormattedMessage id="button.confirm" defaultMessage="confirm" />
          }
          variant="filled"
          sizeVariant="normal"
          colorVariant="secondary"
        />
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
