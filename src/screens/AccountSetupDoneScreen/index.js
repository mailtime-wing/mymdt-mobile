import React, {useContext} from 'react';
import {FormattedMessage} from 'react-intl';
import {AuthContext} from '@/context/auth';
import {useQuery} from '@apollo/react-hooks';
import {GET_USER_REWARDS_API} from '@/api/data';

import {Container, Title, Detail, ScrollContainer} from './style';

import LoadingSpinner from '@/components/LoadingSpinner';

const AccountSetupDoneScreen = ({route, navigation}) => {
  const {authToken, appConfig} = useContext(AuthContext);
  const {data: userRewardsApiData, loading: loadingUserRewards} = useQuery(
    GET_USER_REWARDS_API,
    {
      context: {
        headers: {
          authorization: authToken ? `Bearer ${authToken}` : '',
        },
      },
    },
  );

  const accountSetupReward = userRewardsApiData?.userProfile?.rewards?.find(
    reward => reward.task_id === appConfig?.appConfig?.accountSetupTaskID,
  );

  const handlePress = () => {
    if (accountSetupReward) {
      navigation.navigate(route.params.next, {accountSetupReward});
    } else {
      navigation.navigate(route.params.skip);
    }
  };

  if (loadingUserRewards) {
    return <LoadingSpinner />;
  }

  return (
    <Container activeOpacity={1} onPress={handlePress}>
      <ScrollContainer>
        <Title>
          <FormattedMessage id="success" defaultMessage="SUCCESS" />
        </Title>
        <Detail>
          <FormattedMessage
            id="account_setup_done"
            defaultMessage="Your account has been set up"
          />
        </Detail>
      </ScrollContainer>
    </Container>
  );
};

export default AccountSetupDoneScreen;
