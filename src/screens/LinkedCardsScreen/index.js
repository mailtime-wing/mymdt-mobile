import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';

import ScreenContainer from '@/components/ScreenContainer';
import ThemeButton from '@/components/ThemeButton';
import LinkedCreditCardsSectionList from '@/components/LinkedCreditCardsSectionList';
import useSetupFlow from '@/hooks/useSetupFlow';

import {footerContainer, moreButton} from './style';

const ListFooter = ({onDonePress, onMorePress}) => (
  <View style={footerContainer}>
    <ThemeButton onPress={onDonePress}>
      <FormattedMessage id="done" defaultMessage="Done" />
    </ThemeButton>
    <ThemeButton buttonStyle={moreButton} reverse onPress={onMorePress}>
      <FormattedMessage id="connect_more" />
    </ThemeButton>
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
