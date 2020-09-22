import React, {useState, useRef} from 'react';
import {Dimensions, View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import {css} from '@emotion/native';
import {GET_USER_MEMBERSHIP_API} from '@/api/data';
import {useTheme} from 'emotion-theming';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';

import {
  card,
  highEmphasis,
  mediumEmphasis,
  currentStyle,
  button,
  level,
  privilege,
  requirement,
  requirementsContainer,
  styles,
} from './style';

const {width: viewportWidth} = Dimensions.get('window');

const wp = percentage => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

const slideWidth = wp(100);
const itemHorizontalMargin = wp(0);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const MembershipCardList = ({cardList, onScroll}) => {
  const theme = useTheme();
  const refCarousel = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const {data} = useQueryWithAuth(GET_USER_MEMBERSHIP_API);
  const userLevel = data?.userProfile?.membership?.level || 0;

  const renderItem = ({item, index}) => {
    const current = userLevel === index;
    const next = userLevel + 1 === index;
    return (
      <View
        key={item.level}
        style={[
          css`
            ${theme.colors.elevatedBackground3}
          `,
          card,
        ]}>
        <AppText variant="label" style={currentStyle(theme)}>
          {current ? (
            <FormattedMessage id="current" defaultMessage="Current" />
          ) : next ? (
            <FormattedMessage id="button.next" defaultMessage="Next" />
          ) : (
            ' '
          )}
        </AppText>
        <AppText variant="subTitle1" style={[highEmphasis(theme), level]}>
          {item.label}
        </AppText>
        {item.card}
        {item.privileges.length > 0 && (
          <AppText variant="heading5" style={[highEmphasis(theme), privilege]}>
            <FormattedMessage id="privileges" defaultMessage="Privileges" />
          </AppText>
        )}
        {item.privileges.map(_p => (
          <AppText key={_p} variant="body2" style={highEmphasis(theme)}>
            {_p}
          </AppText>
        ))}
        {item.requirements.length > 0 && (
          <AppText
            variant="heading5"
            style={[highEmphasis(theme), requirement]}>
            <FormattedMessage id="requirements" defaultMessage="Requirements" />
          </AppText>
        )}
        {item.requirements.map(_r => (
          <View key={_r.name} style={requirementsContainer}>
            <AppText variant="body2" style={highEmphasis(theme)}>
              {_r.name}
            </AppText>
            <AppText variant="body2" style={mediumEmphasis(theme)}>
              {_r.detail}
            </AppText>
          </View>
        ))}
        {next && (
          <AppButton
            text={
              <FormattedMessage id="button.upgrade" defaultMessage="Upgrade" />
            }
            variant="filled"
            sizeVariant="normal"
            colorVariant="secondary"
            style={button}
          />
        )}
      </View>
    );
  };

  return (
    <View>
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
        onSnapToItem={index => setActiveIndex(index)}
        onScroll={onScroll}
      />
      <Pagination
        dotsLength={cardList.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotColor={theme.colors.buttonContrastTextColor}
        dotStyle={styles.paginationDot}
        inactiveDotColor={theme.colors.textOnBackground.disabled}
        inactiveDotScale={1}
        carouselRef={refCarousel}
        tappableDots={!!refCarousel}
      />
    </View>
  );
};

export default MembershipCardList;
