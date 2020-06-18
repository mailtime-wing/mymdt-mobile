import React from 'react';
import {Container, CoinImage, AmountText} from './style';
import {MEASURABLE_DATA_TOKEN} from '@/constants/currency';
import {FormattedNumber} from 'react-intl';

const MdtOrMrpCoin = ({type, amount, size, fontSize}) => {
  const mdtIcon = require('@/assets/mdt_coin.png');
  const mrpIcon = require('@/assets/mrp_coin.png');
  const source = type === MEASURABLE_DATA_TOKEN ? mdtIcon : mrpIcon;

  return (
    <Container>
      <CoinImage size={size} source={source} />
      <AmountText type={type} fontSize={fontSize}>
        <FormattedNumber value={amount} />
      </AmountText>
    </Container>
  );
};

export default MdtOrMrpCoin;
