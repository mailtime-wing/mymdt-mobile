import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';

import useSetupFlow from '@/hooks/useSetupFlow';
import LinkedEmailsFlatList from '@/components/LinkedEmailsFlatList';
import AppButton from '@/components/AppButton';

import {buttonContainer, separator} from './style';

const LinkedEmailsSettingScreen = () => {
  const {navigateByFlow, goBackTo} = useSetupFlow();

  return (
    <LinkedEmailsFlatList
      ListFooterComponent={
        <View style={buttonContainer}>
          <AppButton
            onPress={() => navigateByFlow()}
            text={
              <FormattedMessage id="button.finish" defaultMessage="finish" />
            }
            variant="filled"
            sizeVariant="large"
            colorVariant="secondary"
          />
          <View style={separator} />
          <AppButton
            onPress={() => goBackTo('introduction')}
            text={
              <FormattedMessage
                id="button.connect_more"
                defaultMessage="Connect more"
              />
            }
            variant="outlined"
            sizeVariant="normal"
            colorVariant="secondary"
          />
        </View>
      }
    />
  );
};

export default LinkedEmailsSettingScreen;
