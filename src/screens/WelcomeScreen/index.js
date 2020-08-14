import React from 'react';
import {ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';
import AutoScrolling from 'react-native-auto-scrolling';
import {useTheme} from 'emotion-theming';

import ThemeButton from '@/components/ThemeButton';
import AppText from '@/components/AppText2';
import ScreenContainer from '@/components/ScreenContainer';
import useSetupFlow from '@/hooks/useSetupFlow';

import {
  PaddingContainer,
  AppIconGridImageContainer,
  AppIconGridImage,
  titleStyle,
  detailStyle,
  startAndAgree,
} from './style';

const WelcomeScreen = () => {
  const theme = useTheme();
  const {navigateByFlow} = useSetupFlow();

  return (
    <ScrollView>
      <ScreenContainer hasTopBar>
        <AppText variant="pageTitle" style={titleStyle(theme)}>
          <FormattedMessage id="welcome" defaultMessage="Welcome!" />
        </AppText>
        <AppText variant="body1" style={detailStyle(theme)}>
          <FormattedMessage
            id="welcome_detail"
            defaultMessage="RewardMe is a cashback app that let you earn points after online/offline shopping, in-app purchase or subscribe to online services."
          />
        </AppText>
        <AppIconGridImageContainer>
          <AutoScrolling endPaddingWidth={8} duration={20000}>
            <AppIconGridImage source={require('@/assets/app_icon_grid.png')} />
          </AutoScrolling>
        </AppIconGridImageContainer>
        <PaddingContainer>
          <ThemeButton onPress={() => navigateByFlow()}>
            <FormattedMessage id="next" defaultMessage="Next" />
          </ThemeButton>
        </PaddingContainer>
        <AppText variant="overline" style={startAndAgree(theme)}>
          <FormattedMessage
            id="setting_up_agree_terms_and_policy"
            defaultMessage="By setting up the account, you agree with RewardMe’s Terms of Service and Privacy Policy."
          />
        </AppText>
      </ScreenContainer>
    </ScrollView>
  );
};

export default WelcomeScreen;
