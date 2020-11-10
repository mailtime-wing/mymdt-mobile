import React, {useState, useRef} from 'react';
import {Dimensions, View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import AppText from '@/components/AppText2';
import {GET_USER_MEMBERSHIP_API} from '@/api/data';
import {useTheme} from 'emotion-theming';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import Requirements from '@/components/Requirements';
import Privileges from '@/components/Privileges';

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

const MembershipCardList = ({cardList, onScroll}) => {
  const theme = useTheme();
  const refCarousel = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const {data} = useQueryWithAuth(GET_USER_MEMBERSHIP_API);
  const userLevel = data?.userProfile?.membership?.level || 0;

  const renderItem = ({
    item: {
      level,
      label,
      textColor,
      backgroundColor,
      starColor,
      card,
      membership: {
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
        {(cashbackPercentage || merchantsNumAllowed || stakingInterestRate) && (
          <Privileges
            key={level}
            starColor={starColor}
            cashbackPercentage={cashbackPercentage}
            merchantsNumAllowed={merchantsNumAllowed}
            stakingInterestRate={stakingInterestRate}
            style={privilegeSectionPadding}
          />
        )}
        <Requirements
          requirements={restMembership}
          currentStakeAmount={200000}
          currentReferralNum={2}
          currentBindingNum={2}
        />
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
