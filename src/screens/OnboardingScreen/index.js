import React, {useState, useRef, useContext} from 'react';
import {Dimensions, View, Image} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {useTheme} from 'emotion-theming';
import {
  container,
  cardSectionContainer,
  separator,
  carouselContainer,
  paddingHorizontal,
  headerStyle,
  detailStyle,
  image as imageStyle,
  styles,
} from './style';
import {ThemeContext} from '@/context/theme';
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
  const {isDark} = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const refCarousel = useRef(null);

  const renderItem = ({item: {header, detail, imgSrc}, index}) => {
    return (
      <View>
        <Image style={imageStyle} source={imgSrc} resizeMode="contain" />
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
      imgSrc: isDark
        ? require('@/assets/onboarding01-dark.png')
        : require('@/assets/onboarding01-light.png'),
    },
    {
      header: <FormattedMessage id="onboarding02_title" />,
      detail: <FormattedMessage id="onboarding02_detail" />,
      imgSrc: isDark
        ? require('@/assets/onboarding02-dark.png')
        : require('@/assets/onboarding02-light.png'),
    },
    {
      header: <FormattedMessage id="onboarding03_title" />,
      detail: <FormattedMessage id="onboarding03_detail" />,
      imgSrc: isDark
        ? require('@/assets/onboarding03-dark.png')
        : require('@/assets/onboarding03-light.png'),
    },
  ];

  return (
    <View style={cardSectionContainer}>
      <View style={separator} />
      <View style={carouselContainer}>
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
          loop={true}
        />
      </View>
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotColor={theme.colors.secondary.normal}
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
  <SafeAreaView style={container}>
    <CardSection />
    <View style={paddingHorizontal}>
      <AppButton
        onPress={() => navigation.navigate('enter')}
        text="start earning"
        variant="filled"
        sizeVariant="large"
        colorVariant="secondary"
      />
    </View>
  </SafeAreaView>
);

export default OnboardingScreen;
