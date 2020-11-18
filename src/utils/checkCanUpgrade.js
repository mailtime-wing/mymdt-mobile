const BINDING = 'binding';
const REFERRAL = 'referral';
const STAKING = 'staking';
const INVITATION = 'invitation';

const checkCanUpgrade = (
  membership,
  referFriendCount,
  bindDataSourceCount,
  currentStakeAmount,
) => {
  const requirementsList = [];

  function checkRequirementIsMet(requirement) {
    switch (requirement) {
      case REFERRAL:
        if (referFriendCount >= membership?.referralsNumRequired) {
          return true;
        }
        return false;
      case BINDING:
        if (bindDataSourceCount >= membership?.dataSourceBindingsNumRequired) {
          return true;
        }
        return false;
      case STAKING:
        if (currentStakeAmount >= membership?.stakingPlan?.amount) {
          return true;
        }
        return false;
      case INVITATION:
        return false;
      default:
        return false;
    }
  }

  if (membership?.dataSourceBindingsNumRequired > 0) {
    requirementsList.push(BINDING);
  }
  if (membership?.referralsNumRequired > 0) {
    requirementsList.push(REFERRAL);
  }
  if (membership?.stakingPlan) {
    requirementsList.push(STAKING);
  }
  if (membership?.isInvitationRequired) {
    requirementsList.push(INVITATION);
  }

  if (membership?.operator === 'AND') {
    return requirementsList.every((r) => checkRequirementIsMet(r));
  } else {
    return requirementsList.some((r) => checkRequirementIsMet(r));
  }
};

export default checkCanUpgrade;
