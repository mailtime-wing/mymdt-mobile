import React, {useContext} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {AuthContext} from '@/context/auth';
import {useQuery} from '@apollo/client';
import {GET_USER_MEMBERSHIP_API} from '@/api/data';
import {useTheme} from 'emotion-theming';

import {
  coninsContainer,
  accountContainer,
  coinChip,
  marginRight,
  membershipPosition,
  leftContainer,
} from './style';

import MembershipLevelChip from '@/components/MembershipLevelChip';
import AppAvator from '@/components/AppAvator';
import MDTCoin from '@/components/MDTCoin';
import MRPCoin from '@/components/MRPCoin';
import {
  MEASURABLE_DATA_TOKEN,
  MEASURABLE_REWARD_POINT,
} from '@/constants/currency';

const AccountBar = ({navigation, showCoins}) => {
  const {authToken} = useContext(AuthContext);
  const theme = useTheme();
  const {data} = useQuery(GET_USER_MEMBERSHIP_API, {
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
  });

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
      {showCoins && (
        <View style={coninsContainer}>
          <View style={[coinChip(theme), marginRight]}>
            <MRPCoin
              amount={
                data?.userProfile?.currencyAccounts.find(
                  ca => ca.currencyCode === MEASURABLE_REWARD_POINT,
                ).balance || 0
              }
              size={18}
              fontSize={16}
              color={props => props.theme.colors.textOfMrp}
            />
          </View>
          <View style={coinChip(theme)}>
            <MDTCoin
              amount={
                data?.userProfile?.currencyAccounts.find(
                  ca => ca.currencyCode === MEASURABLE_DATA_TOKEN,
                ).balance || 0
              }
              size={18}
              fontSize={16}
              color={props => props.theme.colors.textOfMdt}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default AccountBar;
