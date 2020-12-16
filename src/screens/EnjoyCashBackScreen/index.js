import React from 'react';
import {View, Image} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';
import SafeAreaView from 'react-native-safe-area-view';

import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import useSetupFlow from '@/hooks/useSetupFlow';
import HeaderTitle from '@/components/HeaderTitle';

import {detail, content, image, container, inner} from './style';

const EnjoyCashBackScreen = () => {
  const theme = useTheme();
  const {navigateByFlow} = useSetupFlow();
  return (
    <SafeAreaView forceInset={{bottom: 'always'}} style={container}>
      <HeaderTitle>
        <FormattedMessage
          id="enjoy_cashback"
          defaultMessage="Enjoy Cash Back"
        />
      </HeaderTitle>
      <View style={inner(theme)}>
        <View style={content}>
          <AppText variant="body1" style={detail(theme)}>
            <FormattedMessage
              id="enjoy_cashback_detail"
              defaultMessage="As a RewardMe member, you will enjoy cash back automatically on your purchases. Once a new transaction is recorded, your rewards await!"
            />
          </AppText>
          <Image
            source={require('@/assets/enjoy_cashback.png')}
            style={image}
            resizeMode="contain"
          />
        </View>
        <AppButton
          onPress={() => navigateByFlow()}
          text={<FormattedMessage id="button.start" defaultMessage="Start" />}
          variant="filled"
          sizeVariant="large"
          colorVariant="secondary"
        />
      </View>
    </SafeAreaView>
  );
};

export default EnjoyCashBackScreen;
