import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {GET_USER_MEMBERSHIP_API} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';

import {accountContainer, membershipPosition, leftContainer} from './style';

import MembershipLevelChip from '@/components/MembershipLevelChip';
import AppAvator from '@/components/AppAvator';

const AccountBar = ({navigation}) => {
  const {data} = useQueryWithAuth(GET_USER_MEMBERSHIP_API);

  return (
    <View style={accountContainer}>
      <View style={leftContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('membership')}>
          <AppAvator
            variant="image"
            sizeVariant="small"
            imageSrc={require('@/assets/dog_avatar.png')}
          />
        </TouchableOpacity>
        <MembershipLevelChip
          style={membershipPosition}
          userLevel={data?.userProfile?.membership?.level || 0}
        />
      </View>
    </View>
  );
};

export default AccountBar;
