import React from 'react';

import Coin from '@/components/Coin';

const MRPCoin = props => {
  const source = require('@/assets/mrp_coin.png');

  return <Coin source={source} {...props} />;
};

export default MRPCoin;
