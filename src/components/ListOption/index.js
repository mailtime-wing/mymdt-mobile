import React from 'react';
import {Option, RightSide, Margin, listLabel, listValue} from './style';
import {useTheme} from 'emotion-theming';

import ArrowIcon from '@/assets/list_arrow.svg';

import AppText from '@/components/AppText2';

const ListOption = ({label, value, noIcon, ...props}) => {
  const theme = useTheme();
  return (
    <Option {...props}>
      <AppText variant="body1" style={listLabel(theme)}>
        {label}
      </AppText>
      <RightSide>
        {value && (
          <AppText variant="body1" style={listValue(theme)}>
            {value}
          </AppText>
        )}
        {noIcon ? null : (
          <>
            <Margin />
            <ArrowIcon stroke={theme.colors.borderColor} strokeWidth={2} />
          </>
        )}
      </RightSide>
    </Option>
  );
};

export default ListOption;
