import React, {useContext} from 'react';

import {AuthContext} from '@/context/auth';
import {useQuery} from '@apollo/react-hooks';
import {GET_USER_MEMBERSHIP_API} from '@/api/data';

import {
  Container,
  AccountContainer,
  MembershipIconContainer,
  CoinChip,
  MarginRight,
} from './style';

import MembershipLevelChip from '@/components/MembershipLevelChip';
import UserIcon from '@/components/UserIcon';
import MDTCoin from '@/components/MDTCoin';
import MRPCoin from '@/components/MRPCoin';

const positionAbsolute = {
  position: 'absolute',
  left: 30,
  top: 24,
};

const AccountBar = ({navigation, showCoins}) => {
  const {authToken} = useContext(AuthContext);
  const {data} = useQuery(GET_USER_MEMBERSHIP_API, {
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
  });

  return (
    <Container>
      <AccountContainer>
        <MembershipIconContainer>
          <UserIcon
            navigation={navigation}
            source={require('@/assets/dog_avatar.png')}
            onPress={() => navigation.navigate('membership')}
          />
          <MembershipLevelChip
            style={positionAbsolute}
            userLevel={data?.userProfile?.membership?.level || 0}
          />
        </MembershipIconContainer>
        {showCoins && (
          <>
            <CoinChip>
              <MRPCoin
                amount={645423} // TODO: GET FROM API ONCE API READY
                size={18}
                fontSize={16}
                color={props => props.theme.colors.secondary.superDark}
              />
            </CoinChip>
            <MarginRight />
            <CoinChip>
              <MDTCoin
                amount={26543} // TODO: GET FROM API ONCE API READY
                size={18}
                fontSize={16}
                color={props => props.theme.colors.primary.normal}
              />
            </CoinChip>
          </>
        )}
      </AccountContainer>
    </Container>
  );
};

export default AccountBar;
