import React from 'react';
import {Animated, Easing} from 'react-native';
import {withAnchorPoint} from 'react-native-anchor-point';
import {BoxBody, Container, Circle, AnimatedView, styles} from './style';

const AnimatedBox = props => {
  const rotateAnim = new Animated.Value(0);

  Animated.sequence([
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ]).start();

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '103deg'],
  });

  const getTransform = () => {
    let transform = {
      transform: [{perspective: 400}, {rotate: rotate}],
    };
    return withAnchorPoint(transform, {x: 1, y: 1}, {width: 127, height: 54});
  };

  return (
    <Animated.Image
      style={[styles.animatedBoxHead, getTransform()]}
      {...props}
    />
  );
};

const AnimatedMove = props => {
  const moveAnim = new Animated.Value(0);

  Animated.timing(moveAnim, {
    toValue: 1,
    duration: 2000,
    useNativeDriver: true,
  }).start();

  const xAxis = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [150 - props.width / 2, props.destX],
  });

  const yAxis = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50 + props.height / 2, props.destY],
  });

  const scale = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 1],
  });

  const rotate = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', props.deg || '0deg'],
  });

  return (
    <AnimatedView
      style={[
        styles.animatedView,
        props.enableShadow && styles.animatedViewShadow,
        props.longShadow && styles.animatedViewShadowLong,
      ]}>
      <Animated.Image
        style={{
          width: props.width,
          height: props.height,
          transform: [
            {translateX: xAxis},
            {translateY: yAxis},
            {scale: scale},
            {rotate: rotate},
          ],
        }}
        {...props}
      />
    </AnimatedView>
  );
};

const starIconSource = require('@/assets/star.png');

const GiftBoxOpen = ({coinIconSource, style}) => (
  <Container style={style}>
    <Circle>
      <AnimatedMove
        width={24}
        height={24}
        deg="45deg"
        destX={253}
        destY={-196}
        source={starIconSource}
      />
      <AnimatedMove
        width={42}
        height={42}
        deg="15deg"
        destX={16}
        destY={-99}
        source={starIconSource}
      />
      <AnimatedMove
        width={80}
        height={80}
        destX={201}
        destY={-239}
        source={starIconSource}
      />
      <AnimatedMove
        width={150}
        height={160}
        deg="-8deg"
        destX={26}
        destY={-153}
        source={coinIconSource}
        // enableShadow
        // longShadow
      />
      <AnimatedMove
        width={60}
        height={64}
        deg="10deg"
        destX={147}
        destY={-91}
        source={coinIconSource}
        // enableShadow
      />
      <AnimatedBox source={require('@/assets/gift_box_head.png')} />
      <BoxBody source={require('@/assets/gift_box_body.png')} />
      {/* TODO: Fix the BoxBody is not under the circle */}
    </Circle>
  </Container>
);

export default GiftBoxOpen;
