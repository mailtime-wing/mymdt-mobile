import styled from '@emotion/native';

export const BrandsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  justify-items: stretch;
`;

export const BrandContainer = styled.TouchableOpacity`
  width: 45%;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px;
  position: relative;
  border-radius: 16px;
  background-color: ${props =>
    props.selected ? props.theme.colors.grey.superLight : 'transparent'};

  border: ${props =>
    props.selected
      ? `2px solid ${props.theme.colors.black.normal}`
      : '2px solid transparent'};
`;

export const BrandContainerView = styled.View`
  width: 45%;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px;
  position: relative;
`;

export const Tick = styled.Image`
  width: 36px;
  height: 36px;
  position: absolute;
  left: -18px;
  top: -18px;
`;

export const BrandIcon = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 24px;
  background-color: ${props => props.theme.colors.black.normal};
`;

export const BrandName = styled.Text`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  margin-top: 8px;
  margin-bottom: 4px;
`;

export const BrandDiscount = styled.Text`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
`;
