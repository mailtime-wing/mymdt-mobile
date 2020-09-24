import React from 'react';
import {FormattedMessage} from 'react-intl';

import AppButton from '@/components/AppButton';
import XIcon from '@/assets/icon_x.svg';

const CancelAppButton = props => (
  <AppButton
    variant="outlined"
    sizeVariant="normal"
    colorVariant="secondary"
    svgIcon={XIcon}
    text={<FormattedMessage id="button.cancel" defaultMessage="Cancel" />}
    {...props}
  />
);

export default CancelAppButton;
