import React from 'react';

import {
  CardContainer,
  CardUpper,
  CardLower,
  Level,
  Discount,
  LowerDetail,
  LowerLabel,
  LowerValue,
  BasicContainer,
  BasicDiscount,
} from './style';

export const BasicCard = () => (
  <BasicContainer>
    <Level>Basic</Level>
    <BasicDiscount>0.5% CASHBACK</BasicDiscount>
  </BasicContainer>
);

const MembershipCard = ({
  level,
  cashBackPercentage,
  brands,
  friends,
  amount,
}) => {
  const active = level === 'Gold';
  return (
    <CardContainer>
      <CardUpper active={active}>
        <Level>{level}</Level>
        <Discount>Additional {cashBackPercentage}% CashBack</Discount>
        <Discount>{brands}</Discount>
      </CardUpper>
      <CardLower>
        <LowerDetail>
          <LowerLabel>Invite Friends</LowerLabel>
          <LowerValue>{friends} Friends</LowerValue>
        </LowerDetail>
        <LowerDetail>
          <LowerLabel>expend amount</LowerLabel>
          <LowerValue>● {amount}</LowerValue>
        </LowerDetail>
      </CardLower>
    </CardContainer>
  );
};

export default MembershipCard;
