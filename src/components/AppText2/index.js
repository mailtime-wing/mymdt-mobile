import React from 'react';
import {Text} from 'react-native';
import {useTheme} from 'emotion-theming';

import {text} from './style';

const AppText = ({children, variant, style, ...props}) => {
  const theme = useTheme();
  return (
    <Text style={[text(theme, variant), style]} {...props}>
      {children}
    </Text>
  );
};

export default React.memo(AppText);
