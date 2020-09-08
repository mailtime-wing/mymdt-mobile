import React, {useState} from 'react';
import {Modal, View} from 'react-native';
import {css} from '@emotion/native';
import {
  CenteredView,
  titleStyle,
  detailStyle,
  buttonsContainer,
  marginRight,
  modalView,
} from './style';
import {FormattedMessage} from 'react-intl';

import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import {useTheme} from 'emotion-theming';

const PopupModal = ({
  title,
  detail,
  callback,
  cancelButtonLabel,
  okButtonLabel,
}) => {
  const theme = useTheme();
  const [show, setShow] = useState(true);

  const handleCancelPress = () => {
    setShow(false);
    !!callback && callback('CANCEL');
  };

  const handleOkPress = () => {
    setShow(false);
    !!callback && callback('OK');
  };

  return (
    <CenteredView>
      <Modal transparent={true} visible={show}>
        <CenteredView>
          <View
            style={[
              css`
                ${theme.colors.elevatedBackground4}
              `,
              modalView,
            ]}>
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
                    <FormattedMessage id="cancel" defaultMessage="cancel" />
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
                    <FormattedMessage id="okay" defaultMessage="OKAY" />
                  )
                }
                variant="filled"
                sizeVariant="normal"
                colorVariant="secondary"
              />
            </View>
          </View>
        </CenteredView>
      </Modal>
    </CenteredView>
  );
};

export default PopupModal;
