import React from 'react';
import {SafeAreaView} from 'react-native';
import TabNavigatorContainer from '@/components/TabNavigatorContainer';
import AccountBar from '@/components/AccountBar';

const HomeScreen = () => (
  <>
    <SafeAreaView>
      <AccountBar />
    </SafeAreaView>
    <TabNavigatorContainer />
  </>
);

export default HomeScreen;
