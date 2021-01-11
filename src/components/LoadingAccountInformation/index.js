import React, {useEffect, useContext} from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';
import SafeAreaView from 'react-native-safe-area-view';
import {FormattedMessage} from 'react-intl';
import LottieView from 'lottie-react-native';

import {BankContext} from '@/context/bank';
import useEventCallback from '@/hooks/useEventCallback';
import AppText from '@/components/AppText2';

import {container, textContainer, header, description} from './style';

const LoadingAccountInformation = ({onBind, onError}) => {
  const theme = useTheme();
  const {isLoadingAccountDetails, error} = useContext(BankContext);

  const _onBind = useEventCallback(onBind);
  const _onError = useEventCallback(onError);

  useEffect(() => {
    if (!isLoadingAccountDetails) {
      if (error) {
        _onError();
        return;
      }

      _onBind();
    }
  }, [isLoadingAccountDetails, error, _onError, _onBind]);

  return (
    <SafeAreaView
      forceInset={{top: 'always', bottom: 'never'}}
      style={container}>
      <View style={textContainer}>
        <AppText variant="heading3" style={header(theme)}>
          <FormattedMessage id="loading_account_information" />
        </AppText>
        <AppText variant="body1" style={description(theme)}>
          <FormattedMessage id="this_may_take_a_few_minutes" />
        </AppText>
      </View>
      <LottieView
        source={require('@/assets/rewardme_loading_lottie.json')}
        resizeMode="contain"
        autoPlay
        loop
      />
    </SafeAreaView>
  );
};

export default LoadingAccountInformation;
