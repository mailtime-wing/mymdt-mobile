import React from 'react';
import {View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {useTheme} from 'emotion-theming';

import {titleStyle} from './style';

import AppText from '@/components/AppText2';

const ModalContainer = ({title, children, style, ...props}) => {
  const headerHeight = useHeaderHeight();
  const marginTop = headerHeight;
  const theme = useTheme();

  return (
    <View style={[{marginTop}, style]} {...props}>
      <>
        <AppText variant="heading1" style={titleStyle(theme)}>
          {title}
        </AppText>
        {children}
      </>
    </View>
  );
};

export default ModalContainer;
