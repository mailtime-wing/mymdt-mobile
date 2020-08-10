import React, {useContext} from 'react';
import {FormattedMessage} from 'react-intl';
import {useQuery} from '@apollo/react-hooks';

import LoadingSpinner from '@/components/LoadingSpinner';
import useSetupFlow from '@/hooks/useSetupFlow';
import {AuthContext} from '@/context/auth';
import {PreloadDataContext} from '@/context/preloadData';
import {GET_USER_REWARDS_API} from '@/api/data';

import {Container, Title, Detail} from './style';

const AccountSetupDoneScreen = () => {
  const {authToken} = useContext(AuthContext);
  const {appConfig} = useContext(PreloadDataContext);
  const {navigateByFlow} = useSetupFlow();

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
    reward => reward.task_id === appConfig.accountSetupTaskID,
  );

  const handlePress = () => {
    if (accountSetupReward) {
      navigateByFlow('next', {accountSetupReward});
    } else {
      navigateByFlow('back');
    }
  };

  if (loadingUserRewards) {
    return <LoadingSpinner />;
  }

  return (
    <Container activeOpacity={1} onPress={handlePress}>
      <Title>
        <FormattedMessage id="success" defaultMessage="SUCCESS" />
      </Title>
      <Detail>
        <FormattedMessage
          id="account_setup_done"
          defaultMessage="Your account has been set up"
        />
      </Detail>
    </Container>
  );
};

export default AccountSetupDoneScreen;
