import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {
  OffersContainer,
  OfferContainer,
  Tick,
  OfferIcon,
  OfferName,
  OfferDiscount,
  CheckBox,
  StateContainer,
} from './style';

const Offer = ({name, logo, cashbackRate, selected, error, ...props}) => (
  <OfferContainer selected={selected} error={error} {...props}>
    <OfferIcon source={logo} />
    <OfferName>{name}</OfferName>
    <OfferDiscount>Up to {cashbackRate}% cashback</OfferDiscount>
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

const OfferList = ({
  offerList,
  selectedOffers,
  setSelectedOffers,
  offersLimit,
  onError,
}) => {
  const [isError, setIsError] = useState(false);
  onError && onError(isError);

  useEffect(() => {
    // check brands limit
    if (selectedOffers.length > offersLimit) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [selectedOffers, isError, offersLimit]);

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
