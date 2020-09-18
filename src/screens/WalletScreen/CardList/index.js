import React from 'react';
import {Dimensions, View} from 'react-native';

import Carousel from 'react-native-snap-carousel';

import {card, sliderContainer, cardName, usd} from './style';

import AppText from '@/components/AppText2';

const {width: viewportWidth} = Dimensions.get('window');

const wp = percentage => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

const slideWidth = wp(62);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const renderItem = ({item, index}) => {
  const {cardBackgroundColor, cardNameColor} = item.theme;
  return (
    <View key={index} style={card(cardBackgroundColor)}>
      <AppText variant="subTitle1" style={cardName(cardNameColor)}>
        {item.title}
      </AppText>
      <View>
        {item.coin}
        {item.aroundInUsd !== undefined && (
          <AppText variant="body2" style={usd}>
            ≈ ${item.aroundInUsd} USD{' '}
          </AppText>
        )}
      </View>
    </View>
  );
};

const CardList = ({cardList, onSnapToItem, onScroll}) => {
  return (
    <View style={sliderContainer}>
      <Carousel
        data={cardList}
        layout="default"
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        activeAnimationType="decay"
        onSnapToItem={onSnapToItem}
        onScroll={onScroll}
      />
    </View>
  );
};

export default CardList;
