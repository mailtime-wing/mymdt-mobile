import React, {useContext} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import ToastContext from '@/context/toast';

import AppToast from '@/components/AppToast';

import {position, container} from './style';

const ToastList = ({toasts}) => {
  const {removeToast} = useContext(ToastContext);
  return (
    <KeyboardAvoidingView behavior="position" style={position}>
      {toasts.map(({id, ...props}) => (
        <AppToast
          key={id}
          style={container}
          onXPress={() => removeToast(id)}
          {...props}
        />
      ))}
    </KeyboardAvoidingView>
  );
};

ToastList.defaultProps = {
  toasts: [],
};

export default ToastList;
