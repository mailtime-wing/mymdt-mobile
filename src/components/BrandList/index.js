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

const BrandList = ({brandList, selectedBrand, setSelectedBrand}) => {
  const OnSelect = ({id, name}) => {
    if (selectedBrand.find(brand => brand.id === id)) {
      setSelectedBrand(selectedBrand.filter(brand => brand.id !== id));
    } else {
      setSelectedBrand([
        ...selectedBrand,
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
            selectedBrand && !!selectedBrand.find(sb => sb.id === brand.id)
          }
          onPress={() => setSelectedBrand && OnSelect(brand)}
          disabled={!selectedBrand || !setSelectedBrand}
        />
      ))}
    </BrandsContainer>
  );
};

export default BrandList;
