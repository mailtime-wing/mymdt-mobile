import React from 'react';

import Coin from '@/components/Coin';

const MDTCoin = props => {
  const source = require('@/assets/mdt_coin.png');

  return <Coin source={source} {...props} />;
};

export default MDTCoin;
