import React from 'react';
import {useTheme} from 'emotion-theming';
import IconButton from '@/components/IconButton';
import CloseIcon from '@/assets/icon_x.svg';

const CloseIconButton = props => {
  const theme = useTheme();
  return (
    <IconButton
      variant="outlined"
      sizeVariant="small"
      color={theme.colors.contrastColor}
      svgIcon={CloseIcon}
      {...props}
    />
  );
};

export default CloseIconButton;
