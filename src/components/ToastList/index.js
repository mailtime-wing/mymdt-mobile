import React, {useContext} from 'react';
import {View} from 'react-native';
import {ToastContext} from '@/context/toast';

import AppToast from '@/components/AppToast';

import {position, container} from './style';

const ToastList = ({toasts}) => {
  const {removeToast} = useContext(ToastContext);
  return (
    <View style={position}>
      {toasts.map(({id, ...props}) => (
        <AppToast
          key={id}
          style={container}
          onXPress={() => removeToast(id)}
          {...props}
        />
      ))}
    </View>
  );
};

ToastList.defaultProps = {
  toasts: [],
};

export default ToastList;
