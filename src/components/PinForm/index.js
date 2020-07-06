import React, {useState, useRef, useEffect} from 'react';
import {View, Keyboard} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import {Container, Title, Error, Hints, styles} from './style';

const PinForm = ({title, hints, error, onFulfill}) => {
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
    <Container>
      {title && <Title>{title}</Title>}
      {hints && <Hints>{hints}</Hints>}
      <View style={styles.container}>
        <SmoothPinCodeInput
          ref={pinInput}
          placeholder={<View style={styles.pinDot} />}
          mask={<View style={[styles.pinMask, error && styles.pinMaskError]} />}
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
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default PinForm;
