import React from 'react';
import {Container, CoinImage, AmountText} from './style';
import {FormattedNumber} from 'react-intl';

const Coin = ({source, color, amount, size, fontSize}) => {
  return (
    <Container>
      <CoinImage size={size} source={source} />
      <AmountText color={color} fontSize={fontSize}>
        <FormattedNumber value={amount} />
      </AmountText>
    </Container>
  );
};

export default Coin;
