import React, {useState, useLayoutEffect} from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';

import BackIconButton from '@/components/BackIconButton';
import CloseIconButton from '@/components/CloseIconButton';
import EditAppButton from '@/components/EditAppButton';
import ConfirmAppButton from '@/components/ConfirmAppButton';
import CancelAppButton from '@/components/CancelAppButton';
import LinkedEmailsFlatList from '@/components/LinkedEmailsFlatList';
import AppButton from '@/components/AppButton';

import {buttonContainer, addEmailButton} from './style';

const LinkedEmailsSettingScreen = ({navigation}) => {
  const [isEditing, setIsEditing] = useState(false);

  useLayoutEffect(() => {
    if (isEditing) {
      navigation.setOptions({
        headerLeft: () => (
          <CancelAppButton onPress={() => setIsEditing(false)} />
        ),
        headerRight: () => (
          <ConfirmAppButton onPress={() => setIsEditing(false)} />
        ),
      });
    } else {
      navigation.setOptions({
        headerLeft: ({onPress}) => {
          return onPress ? (
            <BackIconButton onPress={onPress} />
          ) : (
            <CloseIconButton onPress={() => navigation.goBack()} />
          );
        },
        headerRight: () => <EditAppButton onPress={() => setIsEditing(true)} />,
      });
    }
  }, [isEditing, navigation]);

  return (
    <LinkedEmailsFlatList
      isEditing={isEditing}
      ListFooterComponent={
        isEditing ? null : (
          <View style={buttonContainer}>
            <AppButton
              onPress={() =>
                navigation.navigate('email_data_source_info_setting', {
                  navigateFromEdit: true,
                })
              }
              text={
                <FormattedMessage
                  id="add_email_account"
                  defaultMessage="ADD EMAIL"
                />
              }
              variant="filled"
              sizeVariant="normal"
              colorVariant="secondary"
              style={addEmailButton}
            />
          </View>
        )
      }
    />
  );
};

export default LinkedEmailsSettingScreen;
