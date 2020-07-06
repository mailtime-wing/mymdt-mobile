import React from 'react';
import {Text} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {MarginBottom, ScrollContainer} from './style';

import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import BonusBox from '@/components/BonusBox';
import NoMoreContent from '@/components/NoMoreContent';
import MDTCoin from '@/components/MDTCoin';
import MRPCoin from '@/components/MRPCoin';

const BonusList = [
  {
    title: <FormattedMessage id="bonus_task_title_1" />,
    detail: <FormattedMessage id="bonus_task_detail_1" />,
    children: (
      <>
        <MDTCoin
          amount={64543}
          size={18}
          fontSize={16}
          color={props => props.theme.colors.primary.dark}
        />
        <MRPCoin
          amount={64543}
          size={18}
          fontSize={16}
          color={props => props.theme.colors.secondary.superDark}
        />
      </>
    ),
  },
  {
    title: <FormattedMessage id="bonus_task_title_2" />,
    detail: <FormattedMessage id="bonus_task_detail_2" />,
    icon: require('@/assets/daily_task_icon.png'),
    children: <Text>Children 2</Text>,
  },
  {
    title: <FormattedMessage id="bonus_task_title_3" />,
    detail: <FormattedMessage id="bonus_task_detail_3" />,
    icon: require('@/assets/account_security_icon.png'),
    children: <Text>Children 3</Text>,
  },
  {
    title: <FormattedMessage id="bonus_task_title_4" />,
    detail: <FormattedMessage id="bonus_task_detail_4" />,
    icon: require('@/assets/follow_us_icon.png'),
    children: <Text>Children 4</Text>,
  },
];

const BonusScreen = props => (
  <LinearGradientBackground>
    <ScrollContainer>
      <AccountBar {...props} />
      {BonusList.map((bonusTask, index) => (
        <>
          <BonusBox
            title={bonusTask.title}
            detail={bonusTask.detail}
            icon={bonusTask.icon}
            children={bonusTask.children}
          />
          {index !== BonusList.length - 1 && <MarginBottom />}
        </>
      ))}
      <NoMoreContent />
    </ScrollContainer>
  </LinearGradientBackground>
);

export default BonusScreen;
