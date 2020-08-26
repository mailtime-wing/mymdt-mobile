import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';

import {container, titleStyle} from './style';

import AppText from '@/components/AppText2';

const ModalContainer = ({title, children, style, ...props}) => {
  const theme = useTheme();

  return (
    <View style={[container, style]} {...props}>
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
