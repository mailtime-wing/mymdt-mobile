import React from 'react';
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

const BrandList = ({brandList, selectedBrands, setSelectedBrands}) => {
  const onSelect = ({id, name}) => {
    if (selectedBrands.find(brand => brand.id === id)) {
      setSelectedBrands(selectedBrands.filter(brand => brand.id !== id));
    } else {
      setSelectedBrands([
        ...selectedBrands,
        {
          id: id,
          name: name,
        },
      ]);
    }
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
