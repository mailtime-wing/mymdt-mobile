import React from 'react';
import {View} from 'react-native';
import AppText from '@/components/AppText2';
import {useTheme} from 'emotion-theming';
import Requirement from '@/components/Requirement';
import {useNavigation} from '@react-navigation/native';

import {
  finished,
  finishedContainer,
  invitationOnly,
  completeSetup,
  rowContainer,
  requestButton,
  or,
} from './style';
import AppButton from '@/components/AppButton';
import CheckedIcon from '@/assets/icon_check-circle-2.svg';

import membershipLevelEnum from '@/enum/membershipLevel';

const Requirements = ({
  membership: {
    level,
    dataSourceBindingsNumRequired,
    referralsNumRequired,
    stakingPlan,
    isInvitationRequired,
    operator,
    stakingInterestRate,
  } = {},
  referFriendCount,
  bindDataSourceCount,
  currentStakeAmount,
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const showCompleteAccountSetup = level === membershipLevelEnum.NEWBIE;
  const showOr = operator === 'OR';

  return (
    <View>
      {isInvitationRequired ? (
        <View style={rowContainer}>
          <AppText variant="subTitle3" style={invitationOnly(theme)}>
            Internal Invitation Only
          </AppText>
          <AppButton
            variant="filled"
            sizeVariant="moreCompact"
            colorVariant="secondary"
            text="request"
            style={requestButton}
          />
        </View>
      ) : (
        <>
          {!!stakingPlan && stakingPlan.amount && (
            <Requirement
              task={`Stake ${stakingPlan.amount} MDT`}
              target={stakingPlan.amount}
              progress={currentStakeAmount}
              action={() =>
                navigation.navigate('stake', {
                  ...stakingPlan,
                  stakingInterestRate: stakingInterestRate,
                })
              }
              actionText="stake mdt"
              colorVariant="primary"
            />
          )}

          {showOr && (
            <AppText variant="overline" style={or(theme)}>
              Or
            </AppText>
          )}

          {!!referralsNumRequired && (
            <Requirement
              task={`Refer ${referralsNumRequired} friend`}
              target={referralsNumRequired}
              progress={referFriendCount}
              action={() => navigation.navigate('referral')}
              actionText="invite friends"
              colorVariant="primary"
            />
          )}

          {!!dataSourceBindingsNumRequired && (
            <Requirement
              task={`Bind ${dataSourceBindingsNumRequired} Email or ${dataSourceBindingsNumRequired} card`}
              target={dataSourceBindingsNumRequired}
              progress={bindDataSourceCount}
              action={() => navigation.navigate('settings')}
              actionText="Bind"
              colorVariant="primary"
            />
          )}

          {showCompleteAccountSetup && (
            <View style={rowContainer}>
              <AppText variant="subTitle3" style={completeSetup(theme)}>
                Complete Account Setup
              </AppText>
              <View style={finishedContainer}>
                <CheckedIcon
                  stroke={theme.colors.primary.normal}
                  strokeWidth={2}
                />
                <AppText variant="subTitle3" style={finished(theme)}>
                  Finished
                </AppText>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

Requirements.defaultProps = {
  stakingPlan: {},
};

export default Requirements;
