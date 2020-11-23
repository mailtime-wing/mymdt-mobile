import React from 'react';
import {View, Image} from 'react-native';
import {FormattedMessage} from 'react-intl';

import AppButton from '@/components/AppButton';
import membershipLevel from '@/enum/membershipLevel';

import {image, button} from './style';

const MembershipInfoCard = ({userLevel, style, onPress}) => {
  const imgSrc =
    userLevel === membershipLevel.NEWBIE
      ? require('@/assets/dashboard_setup_card.png')
      : require('@/assets/dashboard_upgrade_card.png');
  return (
    <View style={style}>
      <Image source={imgSrc} style={image} resizeMode="contain" />
      <AppButton
        onPress={onPress}
        variant="filled"
        sizeVariant="normal"
        colorVariant="secondary"
        text={<FormattedMessage id="view_more" defaultMessage="View more" />}
        style={button}
      />
    </View>
  );
};

export default MembershipInfoCard;
