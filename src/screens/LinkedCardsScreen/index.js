import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';

import ScreenContainer from '@/components/ScreenContainer';
import AppButton from '@/components/AppButton';
import LinkedCreditCardsSectionList from '@/components/LinkedCreditCardsSectionList';
import useSetupFlow from '@/hooks/useSetupFlow';

import {footerContainer, moreButton} from './style';

const ListFooter = ({onDonePress, onMorePress}) => (
  <View style={footerContainer}>
    <AppButton
      onPress={onDonePress}
      text={<FormattedMessage id="done" defaultMessage="Done" />}
      variant="filled"
      sizeVariant="large"
      colorVariant="secondary"
    />
    <AppButton
      onPress={onMorePress}
      text={<FormattedMessage id="connect_more" />}
      variant="outlined"
      sizeVariant="normal"
      colorVariant="secondary"
      style={moreButton}
    />
  </View>
);

const LinkCardsScreen = () => {
  const {navigateByFlow, goBackTo} = useSetupFlow();

  return (
    <ScreenContainer>
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
    </ScreenContainer>
  );
};

export default LinkCardsScreen;
