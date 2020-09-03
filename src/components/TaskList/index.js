import React, {useContext, useState} from 'react';
import {Linking} from 'react-native';
import {FormattedMessage, FormattedDate} from 'react-intl';
import {useMutation} from '@apollo/react-hooks';
import {CLAIM_REWARD_API} from '@/api/data';
import {AuthContext} from '@/context/auth';

import {
  Container,
  RowContainer,
  MarginLeft,
  taskName,
  claimedDateStyle,
} from './style';

import MRPCoin from '@/components/MRPCoin';
import ThemeButton from '@/components/ThemeButton';
import PopupModal from '@/components/PopupModal';
import PopupModalWithLinearGradient from '@/components/PopupModalWithLinearGradient';
import MRPGiftBox from '@/components/MRPGiftBox';
import AppText from '@/components/AppText2';
import {useTheme} from 'emotion-theming';

const flexEnd = {justifyContent: 'flex-end'};
const giftBoxStyle = {
  transform: [
    {
      scale: 0.75,
    },
  ],
};

const TaskList = ({taskList, userRewardList}) => {
  const theme = useTheme();
  const {authToken} = useContext(AuthContext);
  const [clientError, setClientError] = useState(false);
  const [claimRewardRequest, {data, error}] = useMutation(CLAIM_REWARD_API, {
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
  });

  const handleClaimPress = async rewardId => {
    try {
      await claimRewardRequest({
        variables: {
          id: rewardId,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenUrl = async url => {
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
      {taskList.map(task => {
        const relatedReward = userRewardList.find(
          ct => ct.task_id === task.taskId,
        );
        task = {...task, reward: {...relatedReward}};
        const claimedDate = task.reward?.claimed_time;
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
              color={props => props.theme.colors.textOfMrp}
              style={claimed && flexEnd}
            />
            {!claimed ? (
              <MarginLeft>
                {task.isTaskCompleted ? (
                  <ThemeButton
                    small
                    width="auto"
                    onPress={() => handleClaimPress(task.reward?.id)}>
                    <FormattedMessage id="claim" defaultMessage="Claim" />
                  </ThemeButton>
                ) : (
                  <ThemeButton
                    small
                    reverse
                    width="auto"
                    onPress={() => handleOpenUrl(callbackUrl)}>
                    <FormattedMessage id="start" defaultMessage="Start" />
                  </ThemeButton>
                )}
              </MarginLeft>
            ) : null}
          </RowContainer>
        );
      })}
      {data && (
        // TODO: add reward message after preload the user current currency
        <PopupModalWithLinearGradient>
          <MRPGiftBox style={giftBoxStyle} />
        </PopupModalWithLinearGradient>
      )}
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
