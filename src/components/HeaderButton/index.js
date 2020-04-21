import React from 'react';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CloseButton} from './style';

const HeaderButton = ({isModal, root}) => {
  const navigation = useNavigation();

  return (
    <CloseButton
      onPress={() =>
        isModal ? navigation.navigate(root) : navigation.goBack()
      }>
      {isModal ? (
        <Image source={require('@/assets/close.png')} />
      ) : (
        <Image source={require('@/assets/return.png')} />
      )}
    </CloseButton>
  );
};

export default HeaderButton;
