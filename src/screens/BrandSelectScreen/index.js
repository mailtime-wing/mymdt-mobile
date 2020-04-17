import React, {useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {ScrollContainer, Details} from './style';

import Button from '@/components/Button';
import BrandList from '@/components/BrandList';

let numberOfBrand = 2;

const brandList = [
  {id: '274c896f-fd52-4b46-bb7b-941a3c8bed20', name: 'AAAA'},
  {id: '5aecd684-11eb-40fe-958f-db2b51926c8f', name: 'BBBB'},
  {id: 'e7ac5c12-2bee-43a6-86c6-bb4c30a87986', name: 'CCCC'},
  {id: '549c104c-a7c1-4a70-9e19-963f1d15417b', name: 'DDDD'},
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
