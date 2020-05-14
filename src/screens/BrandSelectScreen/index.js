import React, {useState} from 'react';
import {FormattedMessage, defineMessages, useIntl} from 'react-intl';
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
import BrandList from '@/components/BrandList';
import PopupModal from '@/components/PopupModal';

let numberOfBrand = 2;

const brandList = [
  {
    id: '5bf7b9ee-2a9f-4818-8d23-be46951bf300',
    name: 'TencentFilm',
    percentage: '100',
    iconPath: require('@/assets/tencent_film.png'),
  },
  {
    id: '4f9d672d-9d58-4041-933c-d8905e877563',
    name: 'Netflix',
    percentage: '75',
    iconPath: require('@/assets/netflix.png'),
  },
  {
    id: 'a1874666-2bf9-4bb8-a3a0-a52eea0d2737',
    name: 'Apple Store',
    percentage: '5',
    iconPath: require('@/assets/apple_store.png'),
  },
  {
    id: 'fe81dbce-1856-4d56-bc57-1f3ff76c3360',
    name: 'AirBNB',
    percentage: '25',
    iconPath: require('@/assets/airbnb.png'),
  },
  // {id: 'f80a37c1-7feb-473e-a9d8-a69cab2e1968', name: 'EEEE'},
  // {id: '8e1f7d65-4e09-4146-98bf-531755e8cfae', name: 'FFFF'},
  // {id: '37deb0e0-3582-4418-9942-f96aeb6b1d0d', name: 'GGGG'},
];

const BrandSelectScreen = ({navigation}) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const intl = useIntl();

  const formatBrandString = () => {
    const lastBrandIndex = selectedBrands.length - 1;
    const lastBrand = selectedBrands[lastBrandIndex]
      ? selectedBrands[lastBrandIndex].name
      : '';
    let result = selectedBrands
      .map(brand => {
        if (selectedBrands.indexOf(brand) !== lastBrandIndex) {
          return brand.name;
        }
      })
      .join(' and ');
    return result + lastBrand;
  };

  const handlePopupState = state => {
    if (state === 'OK') {
      navigation.navigate('sign_in', {
        isSignUp: true,
        selectedBrands: selectedBrands,
      });
    }
    setShowConfirmPopup(false);
  };

  const handleNextPress = () => {
    setShowConfirmPopup(true);
  };

  const messages = defineMessages({
    brands: {
      id: 'brands',
      defaultMessage:
        '{brandCount, plural, =0 {brand} one {brand} other {brands}}',
    },
  });
  const pluralString = intl.formatMessage(messages.brands, {
    brandCount: selectedBrands.length,
  });
  const brandsSelectedText = `${
    selectedBrands.length
  } ${pluralString} SELECTED`;

  return (
    <Container>
      <ScrollContainer>
        <Title>
          <FormattedMessage id="special_offer" defaultMessage="Special Offer" />
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
            defaultMessage="Please choose <FilterText>{number_of_brands} brands/services</FilterText> to earn points with each time you spend there."
            values={{
              number_of_brands: numberOfBrand,
              FilterText: str => <HightLightText>{str}</HightLightText>,
              // TOFIX: formatting not work in react native
            }}
          />
        </Details>
        <BrandList
          brandList={brandList}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          brandsLimit={numberOfBrand}
        />
      </ScrollContainer>
      <FixedContainer>
        <BrandsSelectedText>{brandsSelectedText}</BrandsSelectedText>
        <ThemeButton onPress={handleNextPress}>
          <FormattedMessage id="next" />
        </ThemeButton>
      </FixedContainer>
      {!!showConfirmPopup && (
        <PopupModal
          title="Confirmation"
          detail={`You have chosen ${formatBrandString()} special offers. You can edit the preference in profile settings afterward.`}
          callback={handlePopupState}
        />
      )}
    </Container>
  );
};

export default BrandSelectScreen;
