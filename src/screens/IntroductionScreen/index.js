import React from 'react';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import {container} from './style';

import useSetupFlow from '@/hooks/useSetupFlow';
import AppButton from '@/components/AppButton';
import ChooseBindDataSource from '@/components/ChooseBindDataSource';
import SafeAreaView from 'react-native-safe-area-view';

const IntroductionScreen = () => {
  const theme = useTheme();
  const {navigateByFlow} = useSetupFlow();
  return (
    <SafeAreaView
      forceInset={{bottom: 'always', top: 'always'}}
      style={container(theme)}>
      <ChooseBindDataSource
        onEmailChoose={() => navigateByFlow('email_flow')}
        onBankChoose={() => navigateByFlow('card_flow')}>
        <AppButton
          variant="outlined"
          sizeVariant="normal"
          colorVariant="contrast"
          text={
            <FormattedMessage
              id="button.skip_for_now"
              defaultMessage="Skip for now"
            />
          }
          onPress={() => navigateByFlow('skip')}
        />
      </ChooseBindDataSource>
    </SafeAreaView>
  );
};

export default IntroductionScreen;
