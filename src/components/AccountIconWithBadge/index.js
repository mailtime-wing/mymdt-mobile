import React from 'react';
import {TouchableOpacity} from 'react-native';
import {GET_USER_MEMBERSHIP_API} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {useNavigation} from '@react-navigation/native';

import {membershipPosition, container} from './style';

import MembershipLevelChip from '@/components/MembershipLevelChip';
import AppAvator from '@/components/AppAvator';

const AccountIconWithBadge = () => {
  const {data} = useQueryWithAuth(GET_USER_MEMBERSHIP_API);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('membership')}
      style={container}>
      <AppAvator
        variant="image"
        sizeVariant="small"
        imageSrc={require('@/assets/dog_avatar.png')}
      />
      <MembershipLevelChip
        style={membershipPosition}
        userLevel={data?.userProfile?.membership?.level || 0}
      />
    </TouchableOpacity>
  );
};

export default AccountIconWithBadge;
