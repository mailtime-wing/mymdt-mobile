import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';
import {
  OffersContainer,
  OfferContainer,
  Tick,
  OfferIcon,
  CheckBox,
  StateContainer,
  offerNameStyle,
  offerDiscountStyle,
} from './style';

import AppText from '@/components/AppText2';

const Offer = ({name, logo, cashbackRate, selected, error, ...props}) => {
  const theme = useTheme();
  return (
    <OfferContainer selected={selected} error={error} {...props}>
      <OfferIcon source={{uri: logo}} />
      <AppText variant="subTitle1" style={offerNameStyle(theme)}>
        {name}
      </AppText>
      <AppText variant="caption" style={offerDiscountStyle(theme)}>
        Up to {cashbackRate}% cashback
      </AppText>
      {!props.disabled && (
        <StateContainer>
          {selected ? (
            <Tick source={require('@/assets/tick.png')} />
          ) : (
            <CheckBox />
          )}
        </StateContainer>
      )}
    </OfferContainer>
  );
};

const OfferList = ({
  offerList,
  selectedOffers,
  setSelectedOffers,
  offersLimit,
  onError,
}) => {
  const isError = !selectedOffers ? true : selectedOffers.length > offersLimit;

  useEffect(() => {
    if (onError) {
      onError(isError);
    }
  }, [isError, onError]);

  const onSelect = offer => {
    // deselect offer
    if (selectedOffers.find(selectedOffer => selectedOffer.id === offer.id)) {
      setSelectedOffers(
        selectedOffers.filter(selectedOffer => selectedOffer.id !== offer.id),
      );
      return;
    }

    // select offer
    setSelectedOffers([
      ...selectedOffers,
      {
        id: offer.id,
        name: offer.brand.name,
        logo: offer.brand.logo,
        cashbackRate: offer.cashbackRate,
      },
    ]);
  };

  return (
    <View>
      <OffersContainer>
        {offerList.map(offer => (
          <Offer
            name={offer.brand.name}
            logo={offer.brand.logo}
            cashbackRate={Number(offer.cashbackRate).toFixed(3)}
            key={offer.id}
            selected={
              selectedOffers && !!selectedOffers.find(sb => sb.id === offer.id)
            }
            onPress={() => setSelectedOffers && onSelect(offer)}
            disabled={!selectedOffers || !setSelectedOffers}
            isError={isError}
          />
        ))}
      </OffersContainer>
    </View>
  );
};

export default OfferList;
