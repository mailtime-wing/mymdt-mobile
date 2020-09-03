import React from 'react';
import {useTheme} from 'emotion-theming';
import IconButton from '@/components/IconButton';
import BackIcon from '@/assets/icon_chevron-left.svg';

const BackIconButton = props => {
  const theme = useTheme();
  return (
    <IconButton
      variant="outlined"
      sizeVariant="small"
      color={theme.colors.contrastColor}
      svgIcon={BackIcon}
      {...props}
    />
  );
};

export default BackIconButton;
