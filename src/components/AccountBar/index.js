import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {GET_USER_MEMBERSHIP_API, GET_CURRENCY_BALANCE_API} from '@/api/data';
import {useTheme} from 'emotion-theming';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';

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
  const theme = useTheme();
  const {data} = useQueryWithAuth(GET_USER_MEMBERSHIP_API);
  const {data: currencyData} = useQueryWithAuth(GET_CURRENCY_BALANCE_API);

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
                currencyData?.userProfile?.currencyAccounts.find(
                  (ca) => ca.currencyCode === MEASURABLE_REWARD_POINT,
                )?.balance || 0
              }
              size={18}
              fontSize={16}
              color={(props) => props.theme.colors.textOfMrp}
            />
          </View>
          <View style={coinChip(theme)}>
            <MDTCoin
              amount={
                currencyData?.userProfile?.currencyAccounts.find(
                  (ca) => ca.currencyCode === MEASURABLE_DATA_TOKEN,
                )?.balance || 0
              }
              size={18}
              fontSize={16}
              color={(props) => props.theme.colors.textOfMdt}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default AccountBar;
