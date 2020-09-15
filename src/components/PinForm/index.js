import React, {useState, useRef, useEffect} from 'react';
import {View, Keyboard} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import {
  hintStyle,
  container,
  pinDot,
  pinMask,
  pinMaskError,
  errorStyle,
} from './style';

import AppText from '@/components/AppText2';
import {useTheme} from 'emotion-theming';

const PinForm = ({hints, error, onFulfill}) => {
  const theme = useTheme();
  const pinInput = useRef(null);
  const [pinCode, setPinCode] = useState('');
  const codeLength = 6;

  const handleOnFulill = code => {
    setTimeout(() => onFulfill(code), 1000);
  };

  useEffect(() => {
    return () => {
      Keyboard.dismiss();
    };
  }, [onFulfill]);

  return (
    <>
      <AppText variant="body1" style={hintStyle(theme)}>
        {hints}
      </AppText>
      <View style={container}>
        <SmoothPinCodeInput
          ref={pinInput}
          placeholder={<View style={pinDot(theme)} />}
          mask={<View style={[pinMask(theme), error && pinMaskError(theme)]} />}
          maskDelay={200}
          codeLength={codeLength}
          password={true}
          cellStyle={null}
          cellStyleFocused={null}
          value={pinCode}
          onTextChange={code => setPinCode(code)}
          onFulfill={code => handleOnFulill(code)}
          editable={pinCode.length < codeLength}
          autoFocus
          keyboardType="number-pad"
        />
      </View>
      {error && (
        <AppText variant="body2" style={errorStyle(theme)}>
          {error}
        </AppText>
      )}
    </>
  );
};

export default PinForm;
