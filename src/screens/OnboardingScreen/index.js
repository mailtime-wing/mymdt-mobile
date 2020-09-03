import React, {useState, useRef} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {useTheme} from 'emotion-theming';
import {
  Container,
  ContentContainer,
  ButtonContainer,
  ColorBackground,
  SwiperContainer,
  MarginContainer,
  headerStyle,
  detailStyle,
  styles,
} from './style';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import {FormattedMessage} from 'react-intl';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const {width: viewportWidth} = Dimensions.get('window');

const wp = percentage => {
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

  const renderItem = ({item: {header, detail}, index}) => {
    return (
      <ContentContainer>
        <ColorBackground backgroundColor="#DFF7FF" />
        <AppText variant="heading3" style={headerStyle(theme)}>
          {header}
        </AppText>
        <AppText variant="body1" style={detailStyle(theme)}>
          {detail}
        </AppText>
      </ContentContainer>
    );
  };

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
        layout="default"
        data={data}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0}
        containerCustomStyle={styles.container}
        activeAnimationType="decay"
        onSnapToItem={index => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotColor="#00BACE"
        dotStyle={styles.paginationDot}
        inactiveDotColor="rgba(3, 99, 239, 0.2)"
        inactiveDotScale={1}
        carouselRef={refCarousel}
        tappableDots={!!refCarousel}
      />
    </SwiperContainer>
  );
};

const OnboardingScreen = ({navigation}) => (
  <ScrollView>
    <Container>
      <CardSection />
      <ButtonContainer>
        <AppButton
          onPress={() => navigation.navigate('sign_up')}
          text={
            <FormattedMessage
              id="join_rewardme"
              defaultMessage="JOIN REWARDME"
            />
          }
          variant="filled"
          sizeVariant="large"
          colorVariant="secondary"
        />
        <MarginContainer />
        <AppButton
          onPress={() => navigation.navigate('sign_in')}
          text={<FormattedMessage id="sign_in" defaultMessage="Sign In" />}
          variant="outlined"
          sizeVariant="normal"
          colorVariant="secondary"
        />
      </ButtonContainer>
    </Container>
  </ScrollView>
);

export default OnboardingScreen;
