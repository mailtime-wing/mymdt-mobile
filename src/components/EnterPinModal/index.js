import React, {useState, useEffect, useCallback} from 'react';
import {View} from 'react-native';
import {css} from '@emotion/native';
import AppModal from '@/components/AppModal';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';
import useMutationWithReset from '@/hooks/useMutationWithReset';
import {VERIFY_PIN_API} from '@/api/auth';
import {useNavigation} from '@react-navigation/native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import XIcon from '@/assets/icon_x.svg';

import {
  titleStyle,
  buttonContainer,
  closeButton,
  header,
  container,
  pinMask,
  pinContainer,
  errorStyle,
  styles,
} from './style';

const EnterPinModal = ({onSuccess, callback, ...props}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const codeLength = 6;
  const [pin, setPin] = useState('');

  const [verifyPin, {data, error}, reset] = useMutationWithReset(
    VERIFY_PIN_API,
    {},
    {withAuth: true},
  );

  const initiatePinForm = useCallback(() => {
    reset();
    setPin('');
  }, [reset]);

  const handleXIconPress = useCallback(() => {
    initiatePinForm();
    callback();
  }, [callback, initiatePinForm]);

  useEffect(() => {
    if (data) {
      onSuccess && onSuccess(pin);
      handleXIconPress();
    }
  }, [data, handleXIconPress, onSuccess, pin]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        initiatePinForm();
      }, 2000);
    }
  }, [error, initiatePinForm]);

  const handleForgotPinPress = () => {
    handleXIconPress();
    navigation.navigate('settings', {screen: 'forget_pin'});
  };

  const handleOnFulill = useCallback(
    async (code) => {
      try {
        await verifyPin({
          variables: {
            pin: code,
          },
        });
      } catch (e) {
        // console.error(e)
      }
    },
    [verifyPin],
  );

  return (
    <AppModal
      transparent
      modalBodyStyle={[
        css`
          ${theme.colors.elevatedBackgroundHigh}
        `,
      ]}
      {...props}>
      <View style={container}>
        <View style={header}>
          <AppText variant="heading3" style={titleStyle(theme)}>
            <FormattedMessage
              id="enter_your_pin"
              defaultMessage="Enter your PIN"
            />
          </AppText>
          <AppButton
            variant="transparent"
            sizeVariant="normal"
            colorVariant="secondary"
            svgIcon={XIcon}
            style={closeButton}
            onPress={handleXIconPress}
          />
        </View>

        <View style={pinContainer}>
          <SmoothPinCodeInput
            mask={<View style={[pinMask(theme)]} />}
            containerStyle={styles(theme).container}
            cellSpacing={8}
            cellStyle={
              error ? styles(theme).pinCellError : styles(theme).pinCell
            }
            cellStyleFocused={styles(theme).pinCellFocused}
            maskDelay={200}
            codeLength={codeLength}
            password={true}
            value={pin}
            autoFocus
            onTextChange={(code) => setPin(code)}
            onFulfill={handleOnFulill}
            editable={pin.length < codeLength}
            keyboardType="number-pad"
          />
          {!!error && (
            <AppText variant="caption" style={errorStyle(theme)}>
              <FormattedMessage
                id="incorrect_pin"
                defaultMessage="Incorrect PIN"
              />
            </AppText>
          )}
        </View>

        <AppButton
          onPress={handleForgotPinPress}
          text={
            <FormattedMessage id="forgot_pin" defaultMessage="Forgot PIN?" />
          }
          variant="transparent"
          sizeVariant="normal"
          colorVariant="secondary"
          style={buttonContainer}
        />
      </View>
    </AppModal>
  );
};

export default EnterPinModal;
