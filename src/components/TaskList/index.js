import React, {useState} from 'react';
import {Linking} from 'react-native';
import {FormattedMessage, FormattedDate} from 'react-intl';
import useMutationWithReset from '@/hooks/useMutationWithReset';
import {CLAIM_REWARD_API} from '@/api/data';

import {
  Container,
  RowContainer,
  MarginLeft,
  taskName,
  claimedDateStyle,
} from './style';

import MRPCoin from '@/components/MRPCoin';
import AppButton from '@/components/AppButton';
import PopupModal from '@/components/PopupModal';
import RewardGotPopup from '@/components/RewardGotPopup';
import AppText from '@/components/AppText2';
import {useTheme} from 'emotion-theming';

const flexEnd = {justifyContent: 'flex-end'};

const TaskList = ({taskList, userRewardList, onClaimPress}) => {
  const theme = useTheme();
  const [clientError, setClientError] = useState(false);
  const [claimRewardRequest, {data, error}, reset] = useMutationWithReset(
    CLAIM_REWARD_API,
    {},
    {withAuth: true},
  );

  const handleRewardGotPress = () => {
    reset();
    onClaimPress();
  };

  const handleClaimPress = async (rewardId) => {
    try {
      await claimRewardRequest({
        variables: {
          id: rewardId,
        },
      });
      onClaimPress();
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenUrl = async (url) => {
    if (!url) {
      setClientError(true);
      return;
    }
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <>
      {taskList.map((task) => {
        const relatedReward = userRewardList.find(
          (ct) => ct.taskId === task.taskId,
        );
        task = {...task, reward: {...relatedReward}};
        const claimedDate = task.reward?.claimedTime;
        const claimed = !!claimedDate;
        const callbackUrl = task.taskUrl;

        return (
          <RowContainer key={task.name}>
            <Container>
              <AppText variant="body1" style={taskName(theme)}>
                {task.name}
              </AppText>
              {claimedDate && (
                <AppText variant="caption" style={claimedDateStyle(theme)}>
                  <FormattedMessage
                    id="claimed_on"
                    defaultMessage="Claimed on {date}"
                    values={{
                      date: (
                        <FormattedDate
                          value={claimedDate}
                          year="numeric"
                          month="long"
                          day="2-digit"
                        />
                      ),
                    }}
                  />
                </AppText>
              )}
            </Container>
            <MRPCoin
              amount={task.rewardValue}
              size={16}
              fontSize={16}
              color={(props) => props.theme.colors.textOfMrp}
              style={claimed && flexEnd}
            />
            {!claimed ? (
              <MarginLeft>
                {task.isTaskCompleted ? (
                  <AppButton
                    onPress={() => handleClaimPress(task.reward?.id)}
                    text={
                      <FormattedMessage
                        id="button.claim"
                        defaultMessage="Claim"
                      />
                    }
                    variant="filled"
                    sizeVariant="compact"
                    colorVariant="secondary"
                  />
                ) : (
                  <AppButton
                    onPress={() => handleOpenUrl(callbackUrl)}
                    text={
                      <FormattedMessage
                        id="button.start"
                        defaultMessage="Start"
                      />
                    }
                    variant="outlined"
                    sizeVariant="compact"
                    colorVariant="secondary"
                  />
                )}
              </MarginLeft>
            ) : null}
            <RewardGotPopup
              visible={!!data}
              onOkPress={handleRewardGotPress}
              rewardName={<FormattedMessage id="reward_type_bonus_task" />}
              rewardAmount={task.rewardValue}
            />
          </RowContainer>
        );
      })}
      {(error || clientError) && (
        <PopupModal
          title="Something went wrong!"
          detail="Please try again later"
          callback={() => setClientError(false)}
        />
      )}
    </>
  );
};

export default TaskList;
