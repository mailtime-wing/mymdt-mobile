import React, {useState} from 'react';
import {View} from 'react-native';
import {
  BrandsContainer,
  BrandContainer,
  Tick,
  BrandIcon,
  BrandName,
  BrandDiscount,
  CheckBox,
  StateContainer,
} from './style';
import PopupModal from '../PopupModal';

const Brand = ({name, icon, cashBackRate, selected, ...props}) => (
  <BrandContainer selected={selected} {...props}>
    <BrandIcon source={icon} />
    <BrandName>{name}</BrandName>
    <BrandDiscount>Up to {cashBackRate}% cashback</BrandDiscount>
    {!props.disabled && (
      <StateContainer>
        {selected ? (
          <Tick source={require('@/assets/tick.png')} />
        ) : (
          <CheckBox />
        )}
      </StateContainer>
    )}
  </BrandContainer>
);

const BrandList = ({
  brandList,
  selectedBrands,
  setSelectedBrands,
  brandsLimit,
}) => {
  const [error, setError] = useState(null);

  const handlePopupState = state => {
    if (state) {
      setError(null);
    }
  };

  const onSelect = ({id, name, iconPath, percentage}) => {
    // deselect brand
    if (selectedBrands.find(brand => brand.id === id)) {
      setSelectedBrands(selectedBrands.filter(brand => brand.id !== id));
      return;
    }

    // check brands limit
    if (selectedBrands.length >= brandsLimit) {
      setError(`you can choose ${brandsLimit} brands only`);
      return;
    } else {
      setError(null);
    }

    // select brand
    setSelectedBrands([
      ...selectedBrands,
      {
        id: id,
        name: name,
        iconPath: iconPath,
        percentage: percentage,
      },
    ]);
  };

  return (
    <View>
      <BrandsContainer>
        {brandList.map(brand => (
          <Brand
            name={brand.name}
            icon={brand.iconPath}
            cashBackRate={brand.percentage}
            key={brand.id}
            selected={
              selectedBrands && !!selectedBrands.find(sb => sb.id === brand.id)
            }
            onPress={() => setSelectedBrands && onSelect(brand)}
            disabled={!selectedBrands || !setSelectedBrands}
          />
        ))}
      </BrandsContainer>
      {!!error && (
        <PopupModal callback={handlePopupState} title="Error" detail={error} />
      )}
    </View>
  );
};

export default BrandList;
