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

const Requirements = ({
  requirements: {
    dataSourceBindingsNumRequired,
    referralsNumRequired,
    stakingPlan: {amount} = {},
    isInvitationRequired,
  },
  currentStakeAmount,
  currentReferralNum,
  currentBindingNum,
}) => {
  const theme = useTheme();
  const showCompleteAccountSetup =
    !isInvitationRequired &&
    !referralsNumRequired &&
    !amount &&
    !dataSourceBindingsNumRequired;
  const showOr = !!referralsNumRequired && !!amount;

  return (
    <View style={[container(theme), requirementSection]}>
      <AppText variant="label" style={requirement(theme)}>
        <FormattedMessage id="requirements" defaultMessage="Requirements" />
      </AppText>

      {isInvitationRequired && (
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
      )}

      {amount && (
        <Requirement
          task={`Stake ${amount} MDT`}
          target={amount}
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

      {referralsNumRequired > 0 && (
        <Requirement
          task={`Refer ${referralsNumRequired} friend`}
          target={referralsNumRequired}
          progress={currentReferralNum}
          action={() => console.log('pressed')}
          actionText="invite friends"
          colorVariant="primary"
        />
      )}

      {dataSourceBindingsNumRequired > 0 && (
        <Requirement
          task={`Bind ${dataSourceBindingsNumRequired} Email or ${dataSourceBindingsNumRequired} card`}
          target={dataSourceBindingsNumRequired}
          progress={currentBindingNum}
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
            <CheckedIcon stroke={theme.colors.primary.normal} strokeWidth={2} />
            <AppText variant="subTitle3" style={finished(theme)}>
              Finished
            </AppText>
          </View>
        </View>
      )}
    </View>
  );
};

Requirements.defaultProps = {
  dataSourceBindingsNumRequired: 0,
  referralsNumRequired: 0,
  isInvitationRequired: false,
  currentStakeAmount: 0,
  currentReferralNum: 0,
  currentBindingNum: 0,
};

export default Requirements;
