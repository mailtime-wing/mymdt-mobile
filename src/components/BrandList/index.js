import React from 'react';
import {Alert} from 'react-native';
import {
  BrandsContainer,
  BrandContainer,
  Tick,
  BrandIcon,
  BrandName,
  BrandDiscount,
} from './style';

const Brand = ({name, selected, ...props}) => (
  <BrandContainer selected={selected} {...props}>
    {selected && <Tick source={require('@/assets/tick.png')} />}
    <BrandIcon />
    <BrandName>{name}</BrandName>
    <BrandDiscount>Up to 5% cashback</BrandDiscount>
  </BrandContainer>
);

const BrandList = ({
  brandList,
  selectedBrands,
  setSelectedBrands,
  brandsLimit,
}) => {
  const onSelect = ({id, name}) => {
    // deselect brand
    if (selectedBrands.find(brand => brand.id === id)) {
      setSelectedBrands(selectedBrands.filter(brand => brand.id !== id));
      return;
    }

    // check brands limit
    if (selectedBrands.length >= brandsLimit) {
      Alert.alert(`you can choose ${brandsLimit} brands only`);
      return;
    }

    // select brand
    setSelectedBrands([
      ...selectedBrands,
      {
        id: id,
        name: name,
      },
    ]);
  };

  return (
    <BrandsContainer>
      {brandList.map(brand => (
        <Brand
          name={brand.name}
          key={brand.id}
          selected={
            selectedBrands && !!selectedBrands.find(sb => sb.id === brand.id)
          }
          onPress={() => setSelectedBrands && onSelect(brand)}
          disabled={!selectedBrands || !setSelectedBrands}
        />
      ))}
    </BrandsContainer>
  );
};

export default BrandList;
