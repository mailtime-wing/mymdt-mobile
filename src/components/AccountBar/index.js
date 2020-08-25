import React, {useContext} from 'react';
import {View} from 'react-native';
import {AuthContext} from '@/context/auth';
import {useQuery} from '@apollo/react-hooks';
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
import UserIcon from '@/components/UserIcon';
import MDTCoin from '@/components/MDTCoin';
import MRPCoin from '@/components/MRPCoin';

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
        <UserIcon
          source={require('@/assets/dog_avatar.png')}
          onPress={() => navigation.navigate('membership')}
        />
        <MembershipLevelChip
          style={membershipPosition}
          userLevel={data?.userProfile?.membership?.level || 0}
        />
      </View>
      {showCoins && (
        <View style={coninsContainer}>
          <View style={[coinChip(theme), marginRight]}>
            <MRPCoin
              amount={645423} // TODO: GET FROM API ONCE API READY
              size={18}
              fontSize={16}
              color={props => props.theme.colors.textOfMrp}
            />
          </View>
          <View style={coinChip(theme)}>
            <MDTCoin
              amount={26543} // TODO: GET FROM API ONCE API READY
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
