import React from 'react';
import {Image} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {CloseButton} from './style';

const HeaderButton = ({root}) => {
  const route = useRoute();
  const navigation = useNavigation();
  let isMenu = route.name === 'menu';

  return (
    <CloseButton
      onPress={() =>
        isMenu ? navigation.navigate(root) : navigation.goBack()
      }>
      {isMenu ? (
        <Image source={require('@/assets/close.png')} />
      ) : (
        <Image source={require('@/assets/return.png')} />
      )}
    </CloseButton>
  );
};

export default HeaderButton;
