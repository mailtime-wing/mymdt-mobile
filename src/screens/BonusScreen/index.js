import React, {Fragment, useContext} from 'react';
import {FormattedMessage} from 'react-intl';

import {useQuery} from '@apollo/react-hooks';
import {GET_USER_TASK_GROUPS_AND_REWARD_API} from '@/api/data';
import {AuthContext} from '@/context/auth';

import {MarginBottom, ScrollContainer, TaskListContainer} from './style';

import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import BonusBox from '@/components/BonusBox';
import NoMoreContent from '@/components/NoMoreContent';
import DailyCheckIn from '@/components/DailyCheckIn';
import TaskList from '@/components/TaskList';

const BonusScreen = props => {
  const {authToken} = useContext(AuthContext);
  const {data} = useQuery(GET_USER_TASK_GROUPS_AND_REWARD_API, {
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
    fetchPolicy: 'network-only',
  });

  const userRewardList = data?.userProfile?.rewards;

  return (
    <LinearGradientBackground>
      <ScrollContainer>
        <AccountBar showCoins {...props} />
        <BonusBox
          title={<FormattedMessage id="bonus_task_title_1" />}
          detail={<FormattedMessage id="bonus_task_detail_1" />}
          children={
            <DailyCheckIn
              dayListWithAmount={[10, 20, 30, 40, 50, 50, 50, 50]}
              currentDay={3}
              canCheckIn={true}
            />
          }
        />
        <MarginBottom />
        {data?.userProfile?.taskGroups.map((taskGroup, index) => (
          <Fragment key={taskGroup?.name}>
            <BonusBox
              title={taskGroup?.name}
              detail={taskGroup?.description}
              icon={require('@/assets/daily_task_icon.png')}
              children={
                <TaskListContainer>
                  <TaskList
                    taskList={taskGroup?.userTasks}
                    userRewardList={userRewardList}
                  />
                </TaskListContainer>
              }
            />
            {index !== data?.userProfile?.taskGroups.length - 1 && (
              <MarginBottom />
            )}
          </Fragment>
        ))}
        <NoMoreContent />
      </ScrollContainer>
    </LinearGradientBackground>
  );
};

export default BonusScreen;
