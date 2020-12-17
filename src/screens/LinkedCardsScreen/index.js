import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import SafeAreaView from 'react-native-safe-area-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from 'emotion-theming';

import AppButton from '@/components/AppButton';
import LinkedCreditCardsSectionList from '@/components/LinkedCreditCardsSectionList';
import useSetupFlow from '@/hooks/useSetupFlow';

import {footerContainer, moreButton} from './style';

const ListFooter = ({onDonePress, onMorePress}) => {
  const {bottom} = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <View
      style={[
        {
          paddingBottom:
            bottom + theme.space.marginBetweenContentAndScreenBottom,
        },
        footerContainer,
      ]}>
      <AppButton
        onPress={onDonePress}
        text={<FormattedMessage id="button.done" defaultMessage="Done" />}
        variant="filled"
        sizeVariant="large"
        colorVariant="secondary"
      />
      <AppButton
        onPress={onMorePress}
        text={<FormattedMessage id="button.connect_more" />}
        variant="outlined"
        sizeVariant="normal"
        colorVariant="secondary"
        style={moreButton}
      />
    </View>
  );
};

const LinkCardsScreen = () => {
  const {navigateByFlow, goBackTo} = useSetupFlow();

  return (
    <SafeAreaView forceInset={{top: 'always', bottom: 'never'}}>
      <LinkedCreditCardsSectionList
        ListFooterComponent={
          <ListFooter
            onDonePress={() => {
              navigateByFlow();
            }}
            onMorePress={() => {
              goBackTo('introduction');
            }}
          />
        }
      />
    </SafeAreaView>
  );
};

export default LinkCardsScreen;
