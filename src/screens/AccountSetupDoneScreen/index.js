import React, {useContext} from 'react';
import {FormattedMessage} from 'react-intl';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'emotion-theming';

import LoadingSpinner from '@/components/LoadingSpinner';
import AppText from '@/components/AppText2';
import useSetupFlow from '@/hooks/useSetupFlow';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {PreloadDataContext} from '@/context/preloadData';
import {GET_USER_REWARDS_API} from '@/api/data';

import {titleStyle, detailStyle, container} from './style';

const AccountSetupDoneScreen = () => {
  const theme = useTheme();
  const {appConfig} = useContext(PreloadDataContext);
  const {navigateByFlow} = useSetupFlow();

  const {
    data: userRewardsApiData,
    loading: loadingUserRewards,
  } = useQueryWithAuth(GET_USER_REWARDS_API);

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
    <TouchableOpacity style={container} activeOpacity={1} onPress={handlePress}>
      <AppText variant="heading1" style={titleStyle(theme)}>
        <FormattedMessage id="button.success" defaultMessage="SUCCESS" />
      </AppText>
      <AppText variant="heading5" style={detailStyle(theme)}>
        <FormattedMessage
          id="account_setup_done"
          defaultMessage="Your account has been set up"
        />
      </AppText>
    </TouchableOpacity>
  );
};

export default AccountSetupDoneScreen;
