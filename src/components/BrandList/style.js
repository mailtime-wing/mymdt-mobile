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
  padding: 16px;
  position: relative;
  border-radius: 16px;
  background-color: ${props =>
    props.selected ? props.theme.colors.secondary.normal : 'transparent'};
`;

export const BrandContainerView = styled.View`
  width: 45%;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px;
  position: relative;
`;

export const StateContainer = styled.View`
  width: 20px;
  height: 20px;
  margin-top: 12px;
`;

export const Tick = styled.Image``;

export const CheckBox = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  border: 2px solid ${props => props.theme.colors.black.normal};
`;

export const BrandIcon = styled.Image`
  width: 80px;
  height: 80px;
`;

export const BrandName = styled.Text`
  font-size: 18px;
  line-height: 22px;
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 4px;
`;

export const BrandDiscount = styled.Text`
  font-size: 12px;
  line-height: 18px;
  color: ${props => props.theme.colors.black.light};
`;
