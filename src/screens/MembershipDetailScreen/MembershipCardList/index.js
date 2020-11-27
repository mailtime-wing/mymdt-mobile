import React, {useState, useRef, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Dimensions, View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import AppText from '@/components/AppText2';
import {GET_CHECK_USER_CAN_UPGRADE_DATA, UPGRADE_MEMBERSHIP} from '@/api/data';
import {useTheme} from 'emotion-theming';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import MembershipRequirements from './MembershipRequirements';
import Privileges from '@/components/Privileges';

import MembershipGlareCard from '@/components/MembershipGlareCard';
import PopupModal from '@/components/PopupModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import membershipLevel from '@/enum/membershipLevel';
import checkCanUpgrade from '@/utils/checkCanUpgrade';

import {
  card as cardStyle,
  currentStyle,
  level as levelStyle,
  cardContainer,
  upperSection,
  margin,
  tag,
  tagStyle,
  privilegeSectionPadding,
  upgradeButton,
  image,
  styles,
} from './style';
import AppButton from '@/components/AppButton';

const {width: viewportWidth} = Dimensions.get('window');

const wp = (percentage) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

const slideWidth = wp(100);
const itemHorizontalMargin = wp(0);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const CurrentTag = ({style}) => {
  const theme = useTheme();
  return (
    <View style={[tag(theme), style]}>
      <AppText variant="overline" style={currentStyle(theme)}>
        <FormattedMessage id="current" defaultMessage="Current" />
      </AppText>
    </View>
  );
};

const MembershipCardList = ({navigation, route}) => {
  const theme = useTheme();
  const {showNextLevel, showNextStaking} = route.params || {};
  const refCarousel = useRef(null);
  const [showConfirmUpgradePopup, setshowConfirmUpgradePopup] = useState(false);
  const [membershipToBeUpgraded, setMembershipToBeUpgraded] = useState({});

  const {data, loading, refetch} = useQueryWithAuth(
    GET_CHECK_USER_CAN_UPGRADE_DATA,
  );
  const [upgradeMembership] = useMutationWithAuth(UPGRADE_MEMBERSHIP, {
    variables: {id: membershipToBeUpgraded.id},
  });

  const referFriendCount =
    data?.userProfile?.referrals.filter(
      (referral) => referral.isReferrer && referral.status === 'PROCESSED',
    ).length || 0;
  const bindDataSourceCount =
    data?.userProfile?.emailAccounts?.length ||
    0 + data?.userProfile?.bankItems?.length ||
    0;
  const currentStakingPlan = data?.userProfile?.staking[0]?.stakingPlan;
  const currentStakeAmount = currentStakingPlan?.amount || 0;
  const availableMemberships = data?.userProfile?.availableMemberships || [];
  const maximumLevel =
    availableMemberships[availableMemberships.length - 1]?.level;
  const userLevel = data?.userProfile?.membership?.level || 0;
  const userNextLevel = userLevel === maximumLevel ? userLevel : userLevel + 1;
  const nextStakingPlanLevel = availableMemberships.find(
    (ams) =>
      ams.level > userLevel && ams.stakingPlan?.id !== currentStakingPlan.id,
  );

  let initialLevel = userLevel;
  if (showNextLevel) {
    initialLevel = userNextLevel;
  }
  if (showNextStaking) {
    initialLevel = nextStakingPlanLevel?.level || userLevel;
  }
  const [activeIndex, setActiveIndex] = useState(initialLevel);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handleOnSnapToItem = (index) => {
    setActiveIndex(index);
  };

  const handleUpgradePress = (membership) => {
    setMembershipToBeUpgraded(membership);
    setshowConfirmUpgradePopup(true);
  };

  const handlePopupCallback = async (cb) => {
    if (cb === 'OK') {
      try {
        const result = await upgradeMembership();
        if (result) {
          navigation.navigate('upgrade', {level: membershipToBeUpgraded.level});
        }
      } catch (e) {
        // TODO: handle error
      }
    }
    setshowConfirmUpgradePopup(false);
  };

  const cardStyleMap = {
    [membershipLevel.NEWBIE]: {
      backgroundColor: theme.colors.membership.newbie.card.background,
      textColor: theme.colors.membership.newbie.card.text,
      starColor: theme.colors.membership.newbie.star,
    },
    [membershipLevel.STARTER]: {
      backgroundColor: theme.colors.membership.starter.card.background,
      textColor: theme.colors.membership.starter.card.text,
      starColor: theme.colors.membership.starter.star,
    },
    [membershipLevel.EXTRA]: {
      backgroundColor: theme.colors.membership.extra.card.background,
      textColor: theme.colors.membership.extra.card.text,
      starColor: theme.colors.membership.extra.star,
    },
    [membershipLevel.ELITE]: {
      backgroundColor: theme.colors.membership.elite.card.background,
      textColor: theme.colors.membership.elite.card.text,
      starColor: theme.colors.membership.elite.star,
    },
    [membershipLevel.INFINITE]: {
      backgroundColor: theme.colors.membership.infinite.card.background,
      textColor: theme.colors.membership.infinite.card.text,
      starColor: theme.colors.membership.infinite.star,
    },
    [membershipLevel.INFINITE_PRIVILEGE]: {
      backgroundColor:
        theme.colors.membership.infinite_privilege.card.background,
      textColor: theme.colors.membership.infinite_privilege.card.text,
      starColor: theme.colors.membership.infinite_privilege.star,
    },
  };

  const cardList = availableMemberships.map((membership) => {
    const {backgroundColor, textColor, starColor} = cardStyleMap[
      membership.level
    ];
    const dataObj = {};
    dataObj.label = (
      <FormattedMessage id={`membership_level_${membership.level}`} />
    );
    dataObj.card = (
      <MembershipGlareCard userLevel={membership.level} style={image} />
    );
    dataObj.membership = membership;
    dataObj.backgroundColor = backgroundColor;
    dataObj.textColor = textColor;
    dataObj.starColor = starColor;
    dataObj.upgradeAvailable = checkCanUpgrade(
      membership,
      referFriendCount,
      bindDataSourceCount,
      currentStakeAmount,
    );

    return dataObj;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  const renderItem = ({
    item: {
      label,
      textColor,
      backgroundColor,
      starColor,
      card,
      membership,
      upgradeAvailable,
    },
  }) => {
    const isCurrentLevel = userLevel === membership.level;
    const isMembershipLevelHigher = membership.level > userLevel;
    const canUpgrade = upgradeAvailable && isMembershipLevelHigher;

    return (
      <View key={membership.level} style={cardStyle}>
        <View style={upperSection(backgroundColor)}>
          {isCurrentLevel ? (
            <CurrentTag style={tagStyle} />
          ) : (
            <View style={margin} />
          )}
          <AppText variant="heading3" style={levelStyle(textColor)}>
            {label}
          </AppText>
          <View style={cardContainer}>{card}</View>
        </View>
        {membership.level !== membershipLevel.NEWBIE && (
          // Skip Privileges section when userLevel = NEWBIE
          <Privileges
            key={membership.level}
            starColor={starColor}
            cashbackPercentage={membership.cashbackPercentage}
            merchantsNumAllowed={membership.merchantsNumAllowed}
            stakingInterestRate={membership.stakingInterestRate}
            style={privilegeSectionPadding}
          />
        )}
        <MembershipRequirements
          membership={membership}
          referFriendCount={referFriendCount}
          bindDataSourceCount={bindDataSourceCount}
          currentStakeAmount={currentStakeAmount}
        />
        {isMembershipLevelHigher && (
          <AppButton
            onPress={() => handleUpgradePress(membership)}
            variant="filled"
            sizeVariant="normal"
            colorVariant="secondary"
            text={
              canUpgrade ? (
                <FormattedMessage
                  id="button.upgrade"
                  defaultMessage="Upgrade"
                />
              ) : (
                <FormattedMessage
                  id="button.upgrade_not_available"
                  defaultMessage="Upgrade is not available"
                />
              )
            }
            disabled={!canUpgrade}
            style={upgradeButton}
          />
        )}
        {showConfirmUpgradePopup && (
          <PopupModal
            title={
              <FormattedMessage
                id="confirm_upgrade"
                defaultMessage="Confirm Upgrade"
              />
            }
            detail={
              <FormattedMessage
                id="confirm_upgrade_to_next_level"
                defaultMessage="Are you sure to upgrade your membership to {next_level} level?"
                values={{
                  next_level: (
                    <FormattedMessage
                      id={`membership_level_${membershipToBeUpgraded.level}`}
                    />
                  ),
                }}
              />
            }
            callback={handlePopupCallback}
            okButtonLabel={
              <FormattedMessage id="button.confirm" defaultMessage="login" />
            }
          />
        )}
      </View>
    );
  };

  return (
    <View>
      <Pagination
        dotsLength={cardList.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotColor={theme.colors.buttonContrastTextColor}
        dotStyle={styles.paginationDot}
        inactiveDotColor={theme.colors.toggleOff.button}
        inactiveDotScale={1}
        carouselRef={refCarousel}
        tappableDots={!!refCarousel}
      />
      <Carousel
        ref={refCarousel}
        data={cardList}
        layout="default"
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        activeAnimationType="decay"
        onSnapToItem={handleOnSnapToItem}
        firstItem={initialLevel}
      />
    </View>
  );
};

export default MembershipCardList;
