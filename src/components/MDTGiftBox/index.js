import React from 'react';

import GiftBoxOpen from '@/components/GiftBoxOpen';

const coinIconSource = require('@/assets/mdt_coin.png');

const MDTGiftBox = props => (
  <GiftBoxOpen coinIconSource={coinIconSource} {...props} />
);

export default MDTGiftBox;
