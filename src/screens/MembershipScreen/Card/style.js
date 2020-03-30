import styled from '@emotion/native';

export const CardContainer = styled.View`
  border: 1px solid ${props => props.theme.colors.black.normal};
  height: 143px;
  margin-bottom: 8px;
`;

export const CardUpper = styled.View`
  flex: 2;
  background-color: ${props =>
    props.active ? props.theme.colors.gold : props.theme.colors.white.normal};
  padding: 10px 12px;
`;

export const CardLower = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.grey.superLight};
  padding: 10px 12px;
  justify-content: space-between;
  border-top-width: 1px;
`;

export const Level = styled.Text`
  font-size: 16px;
  line-height: 21px;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

export const Discount = styled.Text`
  font-size: 12px;
  line-height: 15px;
  text-transform: uppercase;
  margin-top: 8px;
`;

export const LowerDetail = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LowerLabel = styled.Text`
  font-size: 12px;
  line-height: 15px;
  text-transform: uppercase;
`;

export const LowerValue = styled.Text`
  font-size: 12px;
  line-height: 15px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const BasicContainer = styled.View`
  border: 1px solid ${props => props.theme.colors.black.normal};
  padding: 10px 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
`;

export const BasicDiscount = styled.Text`
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
`;
