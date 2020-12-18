import React from 'react';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';

import {title} from './style';

export default function PageTitle({children, style, ...props}) {
  const theme = useTheme();

  return (
    <AppText variant="heading1" style={[title(theme), style]} {...props}>
      {children}
    </AppText>
  );
}
