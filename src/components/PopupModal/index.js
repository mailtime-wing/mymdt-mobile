import React from 'react';
import {View} from 'react-native';
import {css} from '@emotion/native';
import {
  titleStyle,
  detailStyle,
  buttonsContainer,
  marginRight,
  modalPadding,
} from './style';
import {FormattedMessage} from 'react-intl';

import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import AppModal from '@/components/AppModal';
import {useTheme} from 'emotion-theming';

const PopupModal = ({
  title,
  detail,
  callback,
  cancelButtonLabel,
  okButtonLabel,
  ...props
}) => {
  const theme = useTheme();

  const handleCancelPress = () => {
    !!callback && callback('CANCEL');
  };

  const handleOkPress = () => {
    !!callback && callback('OK');
  };

  return (
    <AppModal
      transparent
      modalBodyStyle={[
        css`
          ${theme.colors.elevatedBackground4}
        `,
        modalPadding,
      ]}
      {...props}>
      <AppText variant="heading3" style={titleStyle(theme)}>
        {title}
      </AppText>
      <AppText variant="body1" style={detailStyle(theme)}>
        {detail}
      </AppText>
      <View style={buttonsContainer}>
        <AppButton
          onPress={handleCancelPress}
          text={
            cancelButtonLabel ? (
              cancelButtonLabel
            ) : (
              <FormattedMessage id="button.cancel" defaultMessage="cancel" />
            )
          }
          variant="outlined"
          sizeVariant="normal"
          colorVariant="secondary"
          style={marginRight}
        />
        <AppButton
          onPress={handleOkPress}
          text={
            okButtonLabel ? (
              okButtonLabel
            ) : (
              <FormattedMessage id="button.okay" defaultMessage="OKAY" />
            )
          }
          variant="filled"
          sizeVariant="normal"
          colorVariant="secondary"
        />
      </View>
    </AppModal>
  );
};

export default PopupModal;
