import React from 'react';

import GiftBoxOpen from '@/components/GiftBoxOpen';

const coinIconSource = require('@/assets/mrp_coin.png');

const MRPGiftBox = props => (
  <GiftBoxOpen coinIconSource={coinIconSource} {...props} />
);

export default MRPGiftBox;
