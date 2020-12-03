import React from 'react';
import {ScrollView, Image} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import ScreenContainer from '@/components/ScreenContainer';
import AppButton from '@/components/AppButton';
import useSetupFlow from '@/hooks/useSetupFlow';

import {detail, title, image, container} from './style';

const EnjoyCashBackScreen = () => {
  const theme = useTheme();
  const {navigateByFlow} = useSetupFlow();
  return (
    <ScrollView style={container}>
      <ScreenContainer>
        <AppText variant="heading2" style={title(theme)}>
          <FormattedMessage
            id="enjoy_cashback"
            defaultMessage="Enjoy Cash Back"
          />
        </AppText>
        <AppText variant="body1" style={detail(theme)}>
          <FormattedMessage
            id="enjoy_cashback_detail"
            defaultMessage="As a RewardMe member, you will enjoy cash back automatically on your purchases. Once a new transaction is recorded, your rewards await!"
          />
        </AppText>
        <Image
          source={require('@/assets/enjoy_cashback.png')}
          resizeMode="contain"
          style={image}
        />
        <AppButton
          onPress={() => navigateByFlow()}
          text={<FormattedMessage id="button.start" defaultMessage="Start" />}
          variant="filled"
          sizeVariant="large"
          colorVariant="secondary"
        />
      </ScreenContainer>
    </ScrollView>
  );
};

export default EnjoyCashBackScreen;
