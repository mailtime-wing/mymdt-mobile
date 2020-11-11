import React, {useState, useRef} from 'react';
import {Dimensions, View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import AppText from '@/components/AppText2';
import {GET_USER_MEMBERSHIP_API, GET_AVAILABLE_MEMBERSHIPS} from '@/api/data';
import {useTheme} from 'emotion-theming';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import Requirements from '@/components/Requirements';
import Privileges from '@/components/Privileges';

import MembershipGlareCard from '@/components/MembershipGlareCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import membershipLevel from '@/enum/membershipLevel';

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
        <FormattedMessage id="isCurrent" defaultMessage="Current" />
      </AppText>
    </View>
  );
};

const MembershipCardList = ({onScroll}) => {
  const theme = useTheme();
  const refCarousel = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const {data, loading} = useQueryWithAuth(GET_USER_MEMBERSHIP_API);
  const {
    data: availableMembershipsData,
    loading: availableMembershipsLoading,
  } = useQueryWithAuth(GET_AVAILABLE_MEMBERSHIPS);
  const userLevel = data?.userProfile?.membership?.level || 0;
  const availableMemberships =
    availableMembershipsData?.userProfile?.availableMemberships || [];

  const cardList = [
    {
      // level: membershipLevel.NEWBIE,
      label: <FormattedMessage id="membership_level_0" />,
      card: (
        <MembershipGlareCard userLevel={membershipLevel.NEWBIE} style={image} />
      ),
      backgroundColor: theme.colors.membership.newbie.card.background,
      textColor: theme.colors.membership.newbie.card.text,
      starColor: theme.colors.membership.newbie.star,
      membership: availableMemberships.find(
        (ams) => ams.level === membershipLevel.NEWBIE,
      ),
      upgradeAvailale: false,
      downgradeAvailale: false,
    },
    {
      level: membershipLevel.STARTER,
      label: <FormattedMessage id="membership_level_1" />,
      card: (
        <MembershipGlareCard
          userLevel={membershipLevel.STARTER}
          style={image}
        />
      ),
      backgroundColor: theme.colors.membership.starter.card.background,
      textColor: theme.colors.membership.starter.card.text,
      starColor: theme.colors.membership.starter.star,
      membership: availableMemberships.find(
        (ams) => ams.level === membershipLevel.STARTER,
      ),
      upgradeAvailale: true,
      downgradeAvailale: true,
    },
    {
      level: membershipLevel.EXTRA,
      label: <FormattedMessage id="membership_level_2" />,
      card: (
        <MembershipGlareCard userLevel={membershipLevel.EXTRA} style={image} />
      ),
      backgroundColor: theme.colors.membership.extra.card.background,
      textColor: theme.colors.membership.extra.card.text,
      starColor: theme.colors.membership.extra.star,
      membership: availableMemberships.find(
        (ams) => ams.level === membershipLevel.EXTRA,
      ),
      upgradeAvailale: true,
      downgradeAvailale: true,
    },
    {
      level: membershipLevel.ELITE,
      label: <FormattedMessage id="membership_level_3" />,
      card: (
        <MembershipGlareCard userLevel={membershipLevel.ELITE} style={image} />
      ),
      backgroundColor: theme.colors.membership.elite.card.background,
      textColor: theme.colors.membership.elite.card.text,
      starColor: theme.colors.membership.elite.star,
      membership: availableMemberships.find(
        (ams) => ams.level === membershipLevel.ELITE,
      ),
      upgradeAvailale: true,
      downgradeAvailale: true,
    },
    {
      level: membershipLevel.INFINITE,
      label: <FormattedMessage id="membership_level_4" />,
      card: (
        <MembershipGlareCard
          userLevel={membershipLevel.INFINITE}
          style={image}
        />
      ),
      backgroundColor: theme.colors.membership.infinite.card.background,
      textColor: theme.colors.membership.infinite.card.text,
      starColor: theme.colors.membership.infinite.star,
      membership: availableMemberships.find(
        (ams) => ams.level === membershipLevel.INFINITE,
      ),
      upgradeAvailale: true,
      downgradeAvailale: true,
    },
    {
      level: membershipLevel.INFINITE_PRIVILEGE,
      label: <FormattedMessage id="membership_level_5" />,
      card: (
        <MembershipGlareCard
          userLevel={membershipLevel.INFINITE_PRIVILEGE}
          style={image}
        />
      ),
      backgroundColor:
        theme.colors.membership.infinite_privilege.card.background,
      textColor: theme.colors.membership.infinite_privilege.card.text,
      starColor: theme.colors.membership.infinite_privilege.star,
      membership: availableMemberships.find(
        (ams) => ams.level === membershipLevel.INFINITE_PRIVILEGE,
      ),
      upgradeAvailale: false,
      downgradeAvailale: false,
    },
  ];

  if (availableMembershipsLoading || loading) {
    return <LoadingSpinner />;
  }

  const renderItem = ({
    item: {
      label,
      textColor,
      backgroundColor,
      starColor,
      card,
      membership: {
        level,
        cashbackPercentage,
        merchantsNumAllowed,
        stakingInterestRate,
        ...restMembership
      },
      upgradeAvailale,
      downgradeAvailale,
    },
    index,
  }) => {
    const isCurrentLevel = userLevel === index;
    const isMembershipLevelLower = index < userLevel;
    const isMembershipLevelHigher = index > userLevel;
    const canUpgrade = upgradeAvailale && isMembershipLevelHigher;
    const canDowngrade = downgradeAvailale && isMembershipLevelLower;

    return (
      <View key={level} style={cardStyle}>
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
        {level !== membershipLevel.NEWBIE && (
          // Skip Privileges section when userLevel = NEWBIE
          <Privileges
            key={level}
            starColor={starColor}
            cashbackPercentage={cashbackPercentage}
            merchantsNumAllowed={merchantsNumAllowed}
            stakingInterestRate={stakingInterestRate}
            style={privilegeSectionPadding}
          />
        )}
        <Requirements requirements={restMembership} membershipLevel={index} />
        {isMembershipLevelHigher && (
          <AppButton
            variant="filled"
            sizeVariant="normal"
            colorVariant="secondary"
            text={canUpgrade ? 'upgrade' : 'upgrade is not available'}
            disabled={!canUpgrade}
            style={upgradeButton}
          />
        )}
        {isMembershipLevelLower && (
          <AppButton
            variant="filled"
            sizeVariant="normal"
            colorVariant="secondary"
            text={canDowngrade ? 'downgrade' : 'downgrade is not available'}
            disabled={!canDowngrade}
            style={upgradeButton}
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
        onSnapToItem={(index) => setActiveIndex(index)}
        onScroll={onScroll}
      />
    </View>
  );
};

export default MembershipCardList;
