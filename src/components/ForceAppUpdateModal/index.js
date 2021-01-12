import React from 'react';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import AppModal from '@/components/AppModal';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';

import {header, detail, modalContainer, button} from './style';

const ForceAppUpdateModal = ({latestAppVersion, onUpdatePress, ...props}) => {
  const theme = useTheme();
  return (
    <AppModal transparent modalBodyStyle={modalContainer(theme)} {...props}>
      <AppText variant="heading3" style={header(theme)}>
        <FormattedMessage
          id="new_version_available"
          defaultMessage="A new version is avaliable"
        />
      </AppText>
      <AppText variant="body1" style={detail(theme)}>
        <FormattedMessage
          id="you_need_to_update_before_use"
          defaultMessage="A new version {latest_app_version} is avaliable. You will need to update to use this app."
          values={{latest_app_version: latestAppVersion}}
        />
      </AppText>
      <AppButton
        variant="filled"
        sizeVariant="normal"
        colorVariant="secondary"
        text={<FormattedMessage id="button.update" defaultMessage="Update" />}
        style={button}
        onPress={onUpdatePress}
      />
    </AppModal>
  );
};

export default ForceAppUpdateModal;
