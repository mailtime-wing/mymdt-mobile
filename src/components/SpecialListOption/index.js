import React from 'react';
import {useTheme} from 'emotion-theming';

import {RowContainer, rowTextStyle} from './style';

import AppText from '@/components/AppText2';

const SpecialListOption = ({label, value, ...props}) => {
  const theme = useTheme();
  return (
    <RowContainer {...props}>
      <AppText variant="body1" style={rowTextStyle(theme)}>
        {label}
      </AppText>
      {value}
    </RowContainer>
  );
};

export default SpecialListOption;
