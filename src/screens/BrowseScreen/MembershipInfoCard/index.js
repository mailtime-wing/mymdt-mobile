import React from 'react';
import {View, Image} from 'react-native';

import AppButton from '@/components/AppButton';
import membershipLevel from '@/enum/membershipLevel';

import {image, button} from './style';

const MembershipInfoCard = ({userLevel, style}) => {
  const imgSrc =
    userLevel === membershipLevel.NEWBIE
      ? require('@/assets/dashboard_setup_card.png')
      : require('@/assets/dashboard_upgrade_card.png');
  return (
    <View style={style}>
      <Image source={imgSrc} style={image} />
      <AppButton
        variant="filled"
        sizeVariant="normal"
        colorVariant="secondary"
        text="view more"
        style={button}
      />
    </View>
  );
};

export default MembershipInfoCard;
