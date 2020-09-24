import React from 'react';
import {FormattedMessage} from 'react-intl';

import AppButton from '@/components/AppButton';
import ArrowLeftIcon from '@/assets/arrow_left_icon.svg';

const BackAppButton = props => (
  <AppButton
    variant="outlined"
    sizeVariant="normal"
    colorVariant="secondary"
    svgIcon={ArrowLeftIcon}
    text={<FormattedMessage id="button.back" defaultMessage="back" />}
    {...props}
  />
);

export default BackAppButton;
