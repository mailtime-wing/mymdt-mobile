import React from 'react';
import {View, FlatList} from 'react-native';
import {useTheme} from 'emotion-theming';
import AppText from '@/components/AppText2';

import {
  rewardContainer,
  contactContainer,
  nameStyle,
  numberStyle,
  statusStyle,
} from './style';

import ContactIcon from '@/assets/contact_icon.svg';

const referralList = [
  {
    icon: <ContactIcon />,
    name: 'Charlie',
    number: '+852 9236 ****',
  },
  {
    icon: <ContactIcon />,
    name: 'Donald',
    number: '+852 2146 ****',
  },
  {
    icon: <ContactIcon />,
    name: 'Eric',
    number: '+852 9876 ****',
  },
];

const RewardsSection = () => {
  const theme = useTheme();

  const renderItem = ({item: {icon, name, number}}) => {
    return (
      <View style={rewardContainer}>
        {icon}
        <View style={contactContainer}>
          <AppText variant="body1" style={nameStyle(theme)}>
            {name}
          </AppText>
          <AppText variant="caption" style={numberStyle(theme)}>
            {number}
          </AppText>
        </View>
        <AppText variant="caption" style={statusStyle(theme)}>
          Pending
        </AppText>
      </View>
    );
  };

  return (
    <FlatList
      data={referralList}
      renderItem={renderItem}
      keyExtractor={item => item.name}
    />
  );
};

export default RewardsSection;
