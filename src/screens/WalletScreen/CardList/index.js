import React from 'react';
import {Dimensions} from 'react-native';

import Carousel from 'react-native-snap-carousel';

import {Card, CardName, AroundInUSD, SliderContainer} from './style';

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
  return (
    <Card key={index} background={item.theme.color}>
      <CardName>{item.title}</CardName>
      {item.coin}
      {item.aroundInUsd !== undefined && (
        <AroundInUSD>≈ ${item.aroundInUsd} USD </AroundInUSD>
      )}
    </Card>
  );
};

const CardList = ({cardList, onSnapToItem, onScroll}) => {
  return (
    <SliderContainer>
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
    </SliderContainer>
  );
};

export default CardList;
