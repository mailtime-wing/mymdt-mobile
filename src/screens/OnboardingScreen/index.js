import React, {useState, useRef} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  Container,
  ContentContainer,
  ButtonContainer,
  ColorBackground,
  Header,
  Details,
  SwiperContainer,
  MarginContainer,
} from './style';
import ThemeButton from '@/components/ThemeButton';
import {FormattedMessage} from 'react-intl';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const {width: viewportWidth} = Dimensions.get('window');

const wp = percentage => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const renderItem = ({item, index}) => {
  return (
    <ContentContainer>
      <ColorBackground backgroundColor="#DFF7FF" />
      <Header>{item.header}</Header>
      <Details>{item.detail}</Details>
    </ContentContainer>
  );
};

const CardSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const refCarousel = useRef(null);

  const data = [
    {
      header: 'Login to your email. Shop. Get cashback rewards.',
      detail:
        'Select your favorite brands and start shopping to earn cashback rewards.',
    },
    {
      header: 'Earn Points every time you shop your favorite brands.',
      detail:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, (Need Big tech terms to distract users)',
    },
    {
      header: 'Collect Points and redeem them on Gift Cards.',
      detail:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy ',
    },
  ];

  return (
    <SwiperContainer>
      <Carousel
        ref={refCarousel}
        layout={'default'}
        data={data}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0}
        containerCustomStyle={styles.container}
        activeAnimationType={'decay'}
        onSnapToItem={index => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotColor={'#00BACE'}
        dotStyle={styles.paginationDot}
        inactiveDotColor={'rgba(3, 99, 239, 0.2)'}
        inactiveDotScale={1}
        carouselRef={refCarousel}
        tappableDots={!!refCarousel}
      />
    </SwiperContainer>
  );
};

const OnboardingScreen = ({navigation}) => (
  <Container>
    <CardSection />
    <ButtonContainer>
      <ThemeButton onPress={() => navigation.navigate('welcome')}>
        <FormattedMessage id="join_rewardme" defaultMessage="JOIN REWARDME" />
      </ThemeButton>
      <MarginContainer />
      <ThemeButton
        reverse
        small
        onPress={() => navigation.navigate('sign_in', {isSignUp: false})}>
        <FormattedMessage id="sign_in" defaultMessage="Sign In" />
      </ThemeButton>
    </ButtonContainer>
  </Container>
);

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {overflow: 'visible'},
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  paginationContainer: {
    marginVertical: 30,
  },
});
