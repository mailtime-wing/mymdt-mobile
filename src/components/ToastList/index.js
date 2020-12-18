import React, {useContext, useEffect} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {useQuery} from '@apollo/client';

import ToastContext from '@/context/toast';
import AppToast from '@/components/AppToast';
import {TOAST_ERRORS} from '@/api/data';

import {position, container} from './style';

const ToastList = () => {
  const {removeToast, popToast} = useContext(ToastContext);
  const {data} = useQuery(TOAST_ERRORS);
  const toasts = data?.toastErrors || [];

  useEffect(() => {
    let interval;

    if (toasts.length > 0) {
      interval = setInterval(popToast, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [toasts, popToast]);

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
