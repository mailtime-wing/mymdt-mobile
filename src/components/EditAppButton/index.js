import React from 'react';
import {FormattedMessage} from 'react-intl';

import AppButton from '@/components/AppButton';
import EditIcon from '@/assets/icon_edit.svg';

const EditAppButton = props => (
  <AppButton
    variant="filled"
    sizeVariant="normal"
    colorVariant="secondary"
    svgIcon={EditIcon}
    text={<FormattedMessage id="button.edit" defaultMessage="edit" />}
    {...props}
  />
);

export default EditAppButton;
