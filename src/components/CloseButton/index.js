import React from 'react';

import IconButton from '@/components/IconButton';
import CloseIcon from '@/assets/icon_x.svg';

const CloseButton = props => (
  <IconButton
    variant="outlined"
    sizeVariant="normal"
    color="black"
    svgIcon={CloseIcon}
    {...props}
  />
);

export default CloseButton;
