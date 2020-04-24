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
    id: 'cf99915a-a3be-4123-87f4-c45f96cd83c0',
    name: 'TencentFilm',
    percentage: '100',
    iconPath: require('@/assets/tencent_film.png'),
  },
  {
    id: '7f3d3616-9956-4cfb-b2c1-bc188cdd5d4c',
    name: 'Netflix',
    percentage: '75',
    iconPath: require('@/assets/netflix.png'),
  },
  {
    id: '0597c537-cca6-47b1-9d14-14a4497f3bcb',
    name: 'Apple Store',
    percentage: '5',
    iconPath: require('@/assets/apple_store.png'),
  },
  {
    id: '6bb2d759-0bc1-493d-9879-47b21812a9de',
    name: 'AirBNB',
    percentage: '25',
    iconPath: require('@/assets/airbnb.png'),
  },
  // {id: 'f2156dea-7b27-49e2-bd49-359138f42535', name: 'EEEE'},
  // {id: 'f2156dea-7b27-49e2-bd49-359138f42535', name: 'FFFF'},
  // {id: 'f2156dea-7b27-49e2-bd49-359138f42535', name: 'GGGG'},
];

const BrandSelectScreen = ({navigation}) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const intl = useIntl();

  const handlePopupState = state => {
    if (state === 'OK') {
      navigation.navigate('brand_select_confirm', {
        selectedBrands: selectedBrands,
        numberOfBrand: numberOfBrand,
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
          detail="You have chosen Netflix and Airbnb special offers. You can edit the preference in profile settings afterward."
          callback={handlePopupState}
        />
      )}
    </Container>
  );
};

export default BrandSelectScreen;
