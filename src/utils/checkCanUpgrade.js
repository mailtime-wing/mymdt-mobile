const BINDING = 'binding';
const REFERRAL = 'referral';
const STAKING = 'staking';
const INVITATION = 'invitation';

const checkCanUpgrade = (
  {
    dataSourceBindingsNumRequired,
    referralsNumRequired,
    stakingPlan,
    isInvitationRequired,
    operator,
  } = {},
  referFriendCount,
  bindDataSourceCount,
  currentStakeAmount,
) => {
  const requirementsList = [];

  function checkRequirementIsMet(requirement) {
    switch (requirement) {
      case REFERRAL:
        if (referFriendCount >= referralsNumRequired) {
          return true;
        }
        return false;
      case BINDING:
        if (bindDataSourceCount >= dataSourceBindingsNumRequired) {
          return true;
        }
        return false;
      case STAKING:
        if (currentStakeAmount >= stakingPlan?.amount) {
          return true;
        }
        return false;
      case INVITATION:
        return false;
      default:
        return false;
    }
  }

  if (dataSourceBindingsNumRequired > 0) {
    requirementsList.push(BINDING);
  }
  if (referralsNumRequired > 0) {
    requirementsList.push(REFERRAL);
  }
  if (stakingPlan) {
    requirementsList.push(STAKING);
  }
  if (isInvitationRequired) {
    requirementsList.push(INVITATION);
  }

  if (operator === 'AND') {
    return requirementsList.every((r) => checkRequirementIsMet(r));
  } else {
    return requirementsList.some((r) => checkRequirementIsMet(r));
  }
};

export default checkCanUpgrade;
