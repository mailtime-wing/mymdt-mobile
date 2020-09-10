import React, {useContext} from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';

import {button, linearGradientStyle, modalPadding} from './style';

import {ThemeContext} from '@/context/theme';
import AppButton from '@/components/AppButton';
import LinearGradient from 'react-native-linear-gradient';
import AppModal from '@/components/AppModal';
import {FormattedMessage} from 'react-intl';

const PopupModalWithLinearGradient = ({
  children,
  callback,
  style,
  ...props
}) => {
  const theme = useTheme();
  const {isDark} = useContext(ThemeContext);

  const handleOkPress = () => {
    !!callback && callback('OK');
  };

  return (
    <AppModal
      transparent
      {...props}
      modalBodyStyle={
        isDark && [
          css`
            ${theme.colors.elevatedBackground4}
          `,
          modalPadding,
        ]
      }>
      {isDark ? (
        <View>
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
    </AppModal>
  );
};

export default PopupModalWithLinearGradient;
