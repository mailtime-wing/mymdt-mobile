import React from 'react';
import {FormattedMessage} from 'react-intl';

import AppButton from '@/components/AppButton';
import CheckIcon from '@/assets/icon_check.svg';

const ConfirmAppButton = props => (
  <AppButton
    variant="filled"
    sizeVariant="normal"
    colorVariant="secondary"
    svgIcon={CheckIcon}
    text={<FormattedMessage id="confirm" defaultMessage="Confirm" />}
    {...props}
  />
);

export default ConfirmAppButton;
