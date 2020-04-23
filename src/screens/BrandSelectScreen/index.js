import React, {useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {ScrollContainer, Details} from './style';

import Button from '@/components/Button';
import BrandList from '@/components/BrandList';

let numberOfBrand = 2;

const brandList = [
  {id: 'cf99915a-a3be-4123-87f4-c45f96cd83c0', name: 'AAAA'},
  {id: '7f3d3616-9956-4cfb-b2c1-bc188cdd5d4c', name: 'BBBB'},
  {id: '0597c537-cca6-47b1-9d14-14a4497f3bcb', name: 'CCCC'},
  {id: '6bb2d759-0bc1-493d-9879-47b21812a9de', name: 'DDDD'},
  // {id: 'f2156dea-7b27-49e2-bd49-359138f42535', name: 'EEEE'},
  // {id: 'f2156dea-7b27-49e2-bd49-359138f42535', name: 'FFFF'},
  // {id: 'f2156dea-7b27-49e2-bd49-359138f42535', name: 'GGGG'},
];

const BrandSelectScreen = ({navigation}) => {
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleNextPress = () => {
    navigation.navigate('brand_select_confirm', {
      selectedBrands: selectedBrands,
      numberOfBrand: numberOfBrand,
    });
  };

  return (
    <ScrollContainer>
      <Details>
        <FormattedMessage id="select_offer_details" />
      </Details>
      <Details>
        <FormattedMessage
          id="please_select_brands"
          defaultMessage="Please select {number_of_brands} brands you shop the most."
          values={{
            number_of_brands: numberOfBrand,
          }}
        />
      </Details>
      <BrandList
        brandList={brandList}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        brandsLimit={2}
      />
      <Button onPress={handleNextPress}>
        <FormattedMessage id="next" />
      </Button>
    </ScrollContainer>
  );
};

export default BrandSelectScreen;
