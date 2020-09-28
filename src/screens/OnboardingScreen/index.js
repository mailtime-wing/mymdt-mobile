import React, {useState, useRef} from 'react';
import {Dimensions, ScrollView, View, Image} from 'react-native';
import {useTheme} from 'emotion-theming';
import {
  container,
  paddingHorizontal,
  headerStyle,
  detailStyle,
  image as imageStyle,
  styles,
} from './style';
import ScreenContainer from '@/components/ScreenContainer';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import {FormattedMessage} from 'react-intl';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const {width: viewportWidth} = Dimensions.get('window');

const wp = (percentage) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

const slideWidth = wp(100);
const itemHorizontalMargin = wp(0);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const CardSection = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const refCarousel = useRef(null);

  const renderItem = ({item: {header, detail, imgSrc}, index}) => {
    return (
      <View>
        <Image style={imageStyle} source={imgSrc} resizeMode="center" />
        <View style={paddingHorizontal}>
          <AppText variant="heading3" style={headerStyle(theme)}>
            {header}
          </AppText>
          <AppText variant="body1" style={detailStyle(theme)}>
            {detail}
          </AppText>
        </View>
      </View>
    );
  };

  const data = [
    {
      header: <FormattedMessage id="onboarding01_title" />,
      detail: <FormattedMessage id="onboarding01_detail" />,
      imgSrc: require('@/assets/onboarding01.png'),
    },
    {
      header: <FormattedMessage id="onboarding02_title" />,
      detail: <FormattedMessage id="onboarding02_detail" />,
      imgSrc: require('@/assets/onboarding02.png'),
    },
    {
      header: <FormattedMessage id="onboarding03_title" />,
      detail: <FormattedMessage id="onboarding03_detail" />,
      imgSrc: require('@/assets/onboarding03.png'),
    },
  ];

  return (
    <View>
      <Carousel
        ref={refCarousel}
        layout="default"
        data={data}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0}
        containerCustomStyle={styles.container}
        activeAnimationType="decay"
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
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

const OnboardingScreen = ({navigation}) => (
  <ScrollView>
    <ScreenContainer style={container}>
      <CardSection />
      <View style={paddingHorizontal}>
        <AppButton
          onPress={() => navigation.navigate('sign_in')}
          text="start earning"
          variant="filled"
          sizeVariant="large"
          colorVariant="secondary"
        />
      </View>
    </ScreenContainer>
  </ScrollView>
);

export default OnboardingScreen;
