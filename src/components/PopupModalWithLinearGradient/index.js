import React, {useState, useContext} from 'react';
import {View, Modal} from 'react-native';
import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';

import {
  CenteredView,
  modalView,
  button,
  linearGradientStyle,
  container,
} from './style';

import {ThemeContext} from '@/context/theme';
import AppButton from '@/components/AppButton';
import LinearGradient from 'react-native-linear-gradient';
import {FormattedMessage} from 'react-intl';

const PopupModalWithLinearGradient = ({children, callback, style}) => {
  const theme = useTheme();
  const [show, setShow] = useState(true);
  const {isDark} = useContext(ThemeContext);

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
            {isDark ? (
              <View style={container}>
                {children}
                <AppButton
                  onPress={handleOkPress}
                  text={<FormattedMessage id="okay" defaultMessage="okay" />}
                  variant="filled"
                  sizeVariant="normal"
                  colorVariant="secondary"
                  style={button}
                />
              </View>
            ) : (
              <LinearGradient
                colors={theme.colors.linearGradientBackground}
                style={linearGradientStyle}>
                {children}
                <AppButton
                  onPress={handleOkPress}
                  text={<FormattedMessage id="okay" defaultMessage="okay" />}
                  variant="filled"
                  sizeVariant="normal"
                  colorVariant="secondary"
                  style={button}
                />
              </LinearGradient>
            )}
          </View>
        </CenteredView>
      </Modal>
    </CenteredView>
  );
};

export default PopupModalWithLinearGradient;
