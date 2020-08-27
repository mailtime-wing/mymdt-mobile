import React from 'react';

import IconButton from '@/components/IconButton';
import BackIcon from '@/assets/icon_chevron-left.svg';

const BackIconButton = props => (
  <IconButton
    variant="outlined"
    sizeVariant="small"
    color="black"
    svgIcon={BackIcon}
    {...props}
  />
);

export default BackIconButton;
