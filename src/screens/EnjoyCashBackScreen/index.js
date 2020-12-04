import React from 'react';
import {View, Image} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import useSetupFlow from '@/hooks/useSetupFlow';
import HeaderTitle from '@/components/HeaderTitle';
import AppKeyboardAvoidingView from '@/components/AppKeyboardAvoidingView';

import {detail, bodyContainer, image, container, inner} from './style';

const EnjoyCashBackScreen = () => {
  const theme = useTheme();
  const {navigateByFlow} = useSetupFlow();
  return (
    <AppKeyboardAvoidingView style={container} behavior="padding">
      <View style={inner}>
        <View>
          <HeaderTitle>
            <FormattedMessage
              id="enjoy_cashback"
              defaultMessage="Enjoy Cash Back"
            />
          </HeaderTitle>
          <View style={bodyContainer}>
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
          </View>
        </View>
        <View style={bodyContainer}>
          <AppButton
            onPress={() => navigateByFlow()}
            text={<FormattedMessage id="button.start" defaultMessage="Start" />}
            variant="filled"
            sizeVariant="large"
            colorVariant="secondary"
          />
        </View>
      </View>
    </AppKeyboardAvoidingView>
  );
};

export default EnjoyCashBackScreen;
