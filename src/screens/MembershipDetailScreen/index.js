import React, {useLayoutEffect} from 'react';
import {ScrollView, Image} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedMessage} from 'react-intl';
import {titleStyle, lines} from './style';

import AppText from '@/components/AppText2';

import MembershipCardList from './MembershipCardList';

const MembershipDetailScreen = ({navigation}) => {
  const theme = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: {
        backgroundColor: theme.colors.linesBackground,
      },
      headerStyle: {
        shadowColor: 'transparent',
        elevation: 0,
        backgroundColor: theme.colors.linesBackground,
      },
    });
  }, [navigation, theme.colors.linesBackground]);

  return (
    <ScrollView>
      <Image source={require('@/assets/lines.png')} style={lines} />
      <AppText variant="heading2" style={titleStyle(theme)}>
        <FormattedMessage
          id="membership_program"
          defaultMessage="Membership program"
        />
      </AppText>
      <MembershipCardList />
    </ScrollView>
  );
};

export default MembershipDetailScreen;
