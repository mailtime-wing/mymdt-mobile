import React from 'react';
import {AccountIcon, UserIconContainer} from './style';

const UserIcon = ({navigation, source, ...props}) => (
  <UserIconContainer
    onPress={() => navigation.navigate('membership')}
    {...props}>
    <AccountIcon source={source} />
  </UserIconContainer>
);

export default UserIcon;
