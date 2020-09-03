import React, {useState, useLayoutEffect} from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';

import ModalContainer from '@/components/ModalContainer';
import LinkedCreditCardsSectionList from '@/components/LinkedCreditCardsSectionList';
import BackIconButton from '@/components/BackIconButton';
import EditAppButton from '@/components/EditAppButton';
import ConfirmAppButton from '@/components/ConfirmAppButton';
import CancelAppButton from '@/components/CancelAppButton';
import AppButton from '@/components/AppButton';
import PlusIcon from '@/assets/icon_plus.svg';

import {footerContainer, addNewCardButton} from './style';

const EditModeListFooter = ({onPress}) => (
  <View style={footerContainer}>
    <AppButton
      variant="filled"
      sizeVariant="normal"
      colorVariant="secondary"
      onPress={onPress}
      text={
        <FormattedMessage id="add_new_card" defaultMessage="Add New Card" />
      }
      svgIcon={PlusIcon}
      style={addNewCardButton}
    />
  </View>
);

const LinkedCardsSettingScreen = ({navigation}) => {
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
        headerLeft: ({onPress}) => <BackIconButton onPress={onPress} />,
        headerRight: () => <EditAppButton onPress={() => setIsEditing(true)} />,
      });
    }
  }, [isEditing, navigation]);

  return (
    <ModalContainer>
      <LinkedCreditCardsSectionList
        enableRemove={isEditing}
        ListFooterComponent={
          isEditing ? null : (
            <EditModeListFooter
              onPress={() => navigation.navigate('choose_region_setting')}
            />
          )
        }
      />
    </ModalContainer>
  );
};

export default LinkedCardsSettingScreen;
