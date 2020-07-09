import React from 'react';
import {FormattedMessage, FormattedDate} from 'react-intl';

import {Container, RowContainer, TaskName, ClaimedDate} from './style';

import MRPCoin from '@/components/MRPCoin';
import ThemeButton from '@/components/ThemeButton';

const flexEnd = {justifyContent: 'flex-end'};

const TaskList = ({taskList}) => (
  <>
    {taskList.map(({name, amount, claimedDate, isTaskCompleted}) => {
      const claimed = !!claimedDate;
      return (
        <RowContainer>
          <Container>
            <TaskName>{name}</TaskName>
            {claimedDate && (
              <ClaimedDate>
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
              </ClaimedDate>
            )}
          </Container>
          <MRPCoin
            amount={amount}
            size={16}
            fontSize={16}
            color={props => props.theme.colors.secondary.superDark}
            style={claimed && flexEnd}
          />
          {!claimed ? (
            isTaskCompleted ? (
              <ThemeButton small width="auto">
                <FormattedMessage id="claim" defaultMessage="Claim" />
              </ThemeButton>
            ) : (
              <ThemeButton small reverse width="auto">
                <FormattedMessage id="start" defaultMessage="Start" />
              </ThemeButton>
            )
          ) : null}
        </RowContainer>
      );
    })}
  </>
);

export default TaskList;
