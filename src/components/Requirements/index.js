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
import {FormattedMessage} from 'react-intl';

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
            <FormattedMessage
              id="internal_invitation_only"
              defaultMessage="Internal Invitation Only"
            />
          </AppText>
          <AppButton
            variant="filled"
            sizeVariant="moreCompact"
            colorVariant="secondary"
            text={
              <FormattedMessage id="button.request" defaultMessage="Request" />
            }
            style={requestButton}
            disabled
          />
        </View>
      ) : (
        <>
          {!!stakingPlan && stakingPlan.amount && (
            <Requirement
              task={
                <FormattedMessage
                  id="stake_amount_of_mdt"
                  defaultMessage="Stake {amount} MDT"
                  values={{
                    amount: stakingPlan.amount,
                  }}
                />
              }
              target={stakingPlan.amount}
              progress={currentStakeAmount}
              action={() =>
                navigation.navigate('stake', {
                  ...stakingPlan,
                  stakingInterestRate: stakingInterestRate,
                })
              }
              actionText={
                <FormattedMessage
                  id="button.stake_mdt"
                  defaultMessage="Stake mdt"
                />
              }
              colorVariant="primary"
            />
          )}

          {showOr && (
            <AppText variant="overline" style={or(theme)}>
              <FormattedMessage id="or" defaultMessage="Or" />
            </AppText>
          )}

          {!!referralsNumRequired && (
            <Requirement
              task={
                <FormattedMessage
                  id="refer_number_of_friends"
                  defaultMessage="Refer {number, plural, =0 {no friend} one {# friend} other {# friends}}"
                  values={{
                    number: referralsNumRequired,
                  }}
                />
              }
              target={referralsNumRequired}
              progress={referFriendCount}
              action={() => navigation.navigate('referral')}
              actionText={
                <FormattedMessage
                  id="button.invite_friends"
                  defaultMessage="Invite friends"
                />
              }
              colorVariant="primary"
            />
          )}

          {!!dataSourceBindingsNumRequired && (
            <Requirement
              task={
                <FormattedMessage
                  id="bind_number_of_accounts"
                  defaultMessage="Bind {number, plural, =0 {no account} one {# account} other {# accounts}}"
                  values={{
                    number: dataSourceBindingsNumRequired,
                  }}
                />
              }
              target={dataSourceBindingsNumRequired}
              progress={bindDataSourceCount}
              action={() => navigation.navigate('settings')}
              actionText={
                <FormattedMessage id="button.bind" defaultMessage="bind" />
              }
              colorVariant="primary"
            />
          )}

          {showCompleteAccountSetup && (
            <View style={rowContainer}>
              <AppText variant="subTitle3" style={completeSetup(theme)}>
                <FormattedMessage
                  id="complete_account_setup"
                  defaultMessage="Complete Account Setup"
                />
              </AppText>
              <View style={finishedContainer}>
                <CheckedIcon
                  stroke={theme.colors.primary.normal}
                  strokeWidth={2}
                />
                <AppText variant="subTitle3" style={finished(theme)}>
                  <FormattedMessage id="finished" defaultMessage="Finished" />
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
