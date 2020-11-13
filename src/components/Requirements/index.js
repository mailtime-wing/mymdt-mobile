import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import AppText from '@/components/AppText2';
import {useTheme} from 'emotion-theming';
import Requirement from '@/components/Requirement';

import {
  requirement,
  container,
  requirementSection,
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
    dataSourceBindingsNumRequired,
    referralsNumRequired,
    stakingPlan,
    isInvitationRequired,
    operator,
  },
  membershipLevel,
  referFriendCount,
  bindDataSourceCount,
  currentStakeAmount,
}) => {
  const theme = useTheme();
  const showCompleteAccountSetup =
    membershipLevel === membershipLevelEnum.NEWBIE;
  const showOr = operator === 'OR';

  return (
    <View style={[container(theme), requirementSection]}>
      <AppText variant="label" style={requirement(theme)}>
        <FormattedMessage id="requirements" defaultMessage="Requirements" />
      </AppText>
      <>
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
                action={() => console.log('pressed')}
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
                action={() => console.log('pressed')}
                actionText="invite friends"
                colorVariant="primary"
              />
            )}

            {!!dataSourceBindingsNumRequired && (
              <Requirement
                task={`Bind ${dataSourceBindingsNumRequired} Email or ${dataSourceBindingsNumRequired} card`}
                target={dataSourceBindingsNumRequired}
                progress={bindDataSourceCount}
                action={() => console.log('pressed')}
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
      </>
    </View>
  );
};

Requirements.defaultProps = {
  stakingPlan: {},
};

export default Requirements;
