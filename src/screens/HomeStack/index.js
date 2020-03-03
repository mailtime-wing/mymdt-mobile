import React from 'react';

import AccountBar from '@/components/AccountBar';
import TabNavigatorContainer from '@/components/TabNavigatorContainer';

const HomeStack = props => {
  return (
    <>
      <AccountBar {...props} />
      <TabNavigatorContainer />
    </>
  );
};

export default HomeStack;
