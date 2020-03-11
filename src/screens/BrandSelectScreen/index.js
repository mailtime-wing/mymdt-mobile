import React, {useState} from 'react';
import {Alert} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {ScrollContainer, Details} from './style';

import Button from '@/components/Button';
import BrandList from '@/components/BrandList';

let numberOfBrand = 2;

const brandList = [
  {id: 1, name: 'AAAA'},
  {id: 2, name: 'BBBB'},
  {id: 3, name: 'CCCC'},
  {id: 4, name: 'DDDD'},
  {id: 5, name: 'EEEE'},
  {id: 6, name: 'FFFF'},
  {id: 7, name: 'GGGG'},
];

const BrandSelectScreen = ({navigation}) => {
  const [selectedBrands, setSelectedBrands] = useState([]);

  const onNextHandler = () => {
    if (selectedBrands.length !== 2) {
      Alert.alert('you can only choose 2 brands');
    } else {
      navigation.navigate('brand_select_confirm', {
        selectedBrands: selectedBrands,
        numberOfBrand: numberOfBrand,
      });
    }
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
      />
      <Button onPress={() => onNextHandler()}>
        <FormattedMessage id="next" />
      </Button>
    </ScrollContainer>
  );
};

export default BrandSelectScreen;
