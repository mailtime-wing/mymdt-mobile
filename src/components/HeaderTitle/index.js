import React from 'react';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';

import {title} from './style';

export default function PageTitle({children, ...props}) {
  const theme = useTheme();

  return (
    <AppText variant="heading1" style={title(theme)} {...props}>
      {children}
    </AppText>
  );
}
