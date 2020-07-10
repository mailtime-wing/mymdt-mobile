import React, {Fragment} from 'react';
import {FormattedMessage} from 'react-intl';

import {MarginBottom, ScrollContainer, TaskListContainer} from './style';

import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import BonusBox from '@/components/BonusBox';
import NoMoreContent from '@/components/NoMoreContent';
import DailyCheckIn from '@/components/DailyCheckIn';
import TaskList from '@/components/TaskList';

const dummyDailyTaskList = [
  {name: 'Share RewardMe', amount: 100, isTaskCompleted: false},
];

const dummyAccountTaskList = [
  {name: 'PIN setup', amount: 100, isTaskCompleted: true},
  {name: 'Turn on FaceID', amount: 100, isTaskCompleted: false},
];

const dummyFollowTaskList = [
  {name: 'Follow Facebook', amount: 100, isTaskCompleted: false},
  {name: 'Follow Twitter', amount: 100, isTaskCompleted: false},
  {
    name: 'Subscribe WeChat',
    amount: 20,
    isTaskCompleted: true,
    claimedDate: new Date(),
  },
  {
    name: 'Follow Weibo',
    amount: 20,
    isTaskCompleted: true,
    claimedDate: new Date(),
  },
];

const BonusList = [
  {
    title: <FormattedMessage id="bonus_task_title_1" />,
    detail: <FormattedMessage id="bonus_task_detail_1" />,
    children: (
      <DailyCheckIn
        dayListWithAmount={[10, 20, 30, 40, 50, 50, 50, 50]}
        currentDay={3}
      />
    ),
  },
  {
    title: <FormattedMessage id="bonus_task_title_2" />,
    detail: <FormattedMessage id="bonus_task_detail_2" />,
    icon: require('@/assets/daily_task_icon.png'),
    children: (
      <TaskListContainer>
        <TaskList taskList={dummyDailyTaskList} />
      </TaskListContainer>
    ),
  },
  {
    title: <FormattedMessage id="bonus_task_title_3" />,
    detail: <FormattedMessage id="bonus_task_detail_3" />,
    icon: require('@/assets/account_security_icon.png'),
    children: (
      <TaskListContainer>
        <TaskList taskList={dummyAccountTaskList} />
      </TaskListContainer>
    ),
  },
  {
    title: <FormattedMessage id="bonus_task_title_4" />,
    detail: <FormattedMessage id="bonus_task_detail_4" />,
    icon: require('@/assets/follow_us_icon.png'),
    children: (
      <TaskListContainer>
        <TaskList taskList={dummyFollowTaskList} />
      </TaskListContainer>
    ),
  },
];

const BonusScreen = props => (
  <LinearGradientBackground>
    <ScrollContainer>
      <AccountBar {...props} />
      {BonusList.map((bonusTask, index) => (
        <Fragment key={index}>
          <BonusBox
            title={bonusTask.title}
            detail={bonusTask.detail}
            icon={bonusTask.icon}
            children={bonusTask.children}
          />
          {index !== BonusList.length - 1 && <MarginBottom />}
        </Fragment>
      ))}
      <NoMoreContent />
    </ScrollContainer>
  </LinearGradientBackground>
);

export default BonusScreen;
